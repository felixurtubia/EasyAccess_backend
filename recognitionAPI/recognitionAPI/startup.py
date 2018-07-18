from django.conf import settings
import face_recognition
import os
import re

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

class FaceRPC(object):
    def __init__(self, known_names, known_face_encodings):
        self.known_names = known_names
        self.known_face_encodings = known_face_encodings

    def find(self, path):
        unknown_image = face_recognition.load_image_file(path)
        unknown_face_encoding = face_recognition.face_encodings(unknown_image)[0]
        results = face_recognition.compare_faces(self.known_face_encodings, unknown_face_encoding)

        if True in results:
            return [name for is_match, name in zip(results, self.known_names) if is_match]
        else:
            return []

def run():
    known_names = []
    known_face_encodings = []
    print('Begin training images in {}'.format(settings.MEDIA_ROOT))
    for file in image_files_in_folder(settings.MEDIA_ROOT):
        basename = os.path.splitext(os.path.basename(file))[0]
        img = face_recognition.load_image_file(file)
        encodings = face_recognition.face_encodings(img)

        known_names.append(basename)
        known_face_encodings.append(encodings[0])
    print("Training Done...")
    print(known_face_encodings)


def image_files_in_folder(folder):
    return [os.path.join(folder, f) for f in os.listdir(folder) if re.match(r'.*\.(jpg|jpeg|png)', f, flags=re.I)]


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS