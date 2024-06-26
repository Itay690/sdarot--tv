from flask import Flask, render_template, request, redirect, flash, url_for
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from videos_crud import (
    get_all_videos,
    get_video_url_by_id,
    get_video_info_by_id,
    upload_video,
)
import os
from utils import format_date

from model import db, User

app = Flask(__name__)

app.config["SECRET_KEY"] = os.urandom(10)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f'sqlite:///{os.path.join(basedir, "instance/users.db")}'
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = ""


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
@login_required
def index():
    try:
        videos = get_all_videos()

        for video in videos:
            video["uploadDate"] = format_date(video["uploadDate"])

    except:
        videos = []

    return render_template("index.html", videos=videos)


@app.route("/login", methods=["GET"])
def login_form():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)
        return redirect(url_for("index"))
    else:
        flash("Invalid username or password", "error")

    return redirect(url_for("login_form"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login_form"))


@app.route("/register", methods=["GET"])
def register_form():
    return render_template("register.html")


@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(username=username).first()

    if user:
        flash("Username already exists", "error")
        return redirect(url_for("register_form"))

    new_user = User(username=username)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for("login_form"))


@app.route("/upload", methods=["GET"])
@login_required
def upload_form():
    return render_template("upload.html")


@app.route("/upload", methods=["POST"])
@login_required
def upload():
    file = request.files["file"]

    if file.filename == "":
        flash("No file has been chosen.", "error")
        return redirect(url_for("upload_form"))

    allowed_extensions = ["mp4"]
    if not file.filename.endswith(tuple(allowed_extensions)):
        flash("Invalid file type. Only .mp4 files are allowed.", "error")
        return redirect(url_for("upload_form"))

    try:
        upload_video(file)
        flash("File uploaded successfully!", "success")

    except:
        flash("Error uploading file.", "error")

    return redirect(url_for("upload_form"))


@app.route("/video/<video_id>", methods=["GET"])
@login_required
def watch_video(video_id):
    try:
        video_url = get_video_url_by_id(video_id)
        video_data = get_video_info_by_id(video_id)
        return render_template("video.html", video_url=video_url, video=video_data)
    except Exception as e:
        return f"Error fetching video: {str(e)}"


if __name__ == "__main__":
    app.run(debug=True)
