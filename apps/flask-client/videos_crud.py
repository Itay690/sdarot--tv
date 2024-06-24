import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_IP = os.getenv("VITE_SERVER_HOSTNAME")
API_PORT = os.getenv("VITE_SERVER_PORT")
API_BASE_URL = f"http://{API_IP}:{API_PORT}/api/videos"


def get_all_videos():
    url = f"{API_BASE_URL}/get-all"

    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch videos"}


def get_video_url_by_id(id):
    url = f"{API_BASE_URL}/{id}"

    response = requests.get(url)

    if response.status_code == 200:
        return url
    else:
        return {"error": f"Couldn't fetch video url with ID: {id}"}


def get_video_info_by_id(id):
    url = f"{API_BASE_URL}/get-one/{id}"

    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Couldn't fetch video data with ID: {id}"}


def upload_video(file):
    url = f"{API_BASE_URL}/upload"
    current_file = {"file": (file.filename, file)}

    response = requests.post(url, files=current_file)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Couldn't upload file"}
