import { Controller, Get, Header, Param, Post, Req, Res } from '@nestjs/common';
import { VideosService } from './videos.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  async upload(@Req() request: FastifyRequest) {
    return this.videosService.upload(request);
  }

  @Get('get-all')
  getAll() {
    return this.videosService.getAll();
  }

  @Get('get-one/:id')
  getOne(@Param('id') id: string) {
    return this.videosService.getOne(id);
  }

  @Get(':id')
  @Header('Content-Type', 'application/mp4')
  downloadFile(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.videosService.download(id, request, response);
  }

  @Get()
  getAllFiles() {
    return this.videosService.getList();
  }
}
