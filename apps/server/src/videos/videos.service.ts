import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FastifyRequest, FastifyReply } from 'fastify';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Connection, Model, mongo } from 'mongoose';
import { Stream } from 'stream';
import { File } from './entities/file.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosService {
  private readonly bucket: GridFSBucket;

  constructor(
    @InjectModel('fs.files') private readonly fileModel: Model<File>,
    @InjectConnection() private readonly connection: Connection,
    private readonly prisma: PrismaService,
  ) {
    this.bucket = new mongo.GridFSBucket(this.connection.db);
  }

  getOne(id: string) {
    const file = this.fileModel.findById(id);

    return file;
  }

  async upload(request: FastifyRequest) {
    const fileId: { id: string } = await new Promise((resolve, reject) => {
      try {
        request.multipart(
          (field, file: Stream, filename, encoding, mimetype) => {
            const id = new ObjectId();
            const uploadStream = this.bucket.openUploadStreamWithId(
              id,
              filename,
              {
                contentType: mimetype,
              },
            );

            file.on('end', () => {
              resolve({
                id: uploadStream.id.toString(),
              });
            });

            file.pipe(uploadStream);
          },
          (err) => {
            console.error(err);
            reject(new ServiceUnavailableException());
          },
        );
      } catch (e) {
        console.error(e);
        reject(new ServiceUnavailableException());
      }
    });

    const dbFile = await this.prisma.videos.create({
      data: { fileId: fileId.id },
    });

    return dbFile;
  }

  async download(id: string, request: FastifyRequest, response: FastifyReply) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestException(null, 'InvalidVideoId');
      }

      const oId = new ObjectId(id);
      const fileInfo = await this.fileModel.findOne({ _id: id }).exec();

      if (!fileInfo) {
        throw new NotFoundException(null, 'VideoNotFound');
      }

      const readstream = this.bucket.openDownloadStream(oId);

      response.status(200);
      response.headers({
        'Accept-Range': 'bytes',
        'Content-Type': fileInfo.contentType,
        'Content-Length': fileInfo.length,
        'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
      });

      return new StreamableFile(readstream);

      // response.send(readstream);
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException();
    }
  }

  async getAll() {
    const mongoFiles = await this.fileModel.find();
    const dbFiles = await this.prisma.videos.findMany();

    return dbFiles.map((dbFile) => {
      const mongoFile = mongoFiles.find((file) => file.id === dbFile.fileId);

      return {
        ...dbFile,
        filename: mongoFile?.filename,
        uploadDate: mongoFile?.uploadDate,
      };
    });
  }

  getList() {
    return this.fileModel.find().exec();
  }
}
