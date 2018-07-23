from django.shortcuts import render
from rest_framework import viewsets, status
#rom face_rest.serializers import PersonImageSerializer
from face_rest.serializers import PersonSerializer
from face.models import Person#, PersonImage
from django.contrib.auth.models import User
from recognitionAPI.startup import predict
import face_recognition
from sklearn import neighbors
import pickle
import math

from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.response import Response
from recognitionAPI.startup import run
import os
from django.conf import settings

# For base64 image decoder
import re
import base64
import uuid
import imghdr

from django.core.files.base import ContentFile
# -----

def to_image(base64_data):
    # Strip data header if it exists
    base64_data = re.sub(r"^data\:.+base64\,(.+)$", r"\1", base64_data)

    # Try to decode the file. Return validation error if it fails.
    try:
        decoded_file = base64.b64decode(base64_data)
    except TypeError:
        msg = "Please upload a valid image."
        print(msg)

    # Get the file name extension:
    extension = imghdr.what("file_name", decoded_file)
    if extension not in ("jpeg", "jpg", "png"):
        msg = "{0} is not a valid image type.".format(extension)
        print(msg)

    extension = "jpg" if extension == "jpeg" else extension
    file_name = ".".join([str(uuid.uuid4()), extension])
    data = ContentFile(decoded_file, name=file_name)
    return data


def prediction(image, knn_clf=None, model_path=None, distance_threshold=0.6):
    """
    Recognizes an image from request 
    """
    if knn_clf is None and model_path is None:
            raise Exception("Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None:
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)
    image = image
    X_img = face_recognition.load_image_file(image)
    X_face_locations = face_recognition.face_locations(X_img)

    if len(X_face_locations) == 0:
        return []

    faces_encodings = face_recognition.face_encodings(X_img, known_face_locations=X_face_locations)

    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    are_matches = [closest_distances[0][i][0] <= distance_threshold for i in range(len(X_face_locations))]

    return [(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    def perform_create(self, serializer):
        #print(self.request.body)
        serializer.save(id_mongo=self.request.data.get('idMongo'),
                            image1=self.request.data.get('image1'),
                            image2=self.request.data.get('image2'),
                            image3=self.request.data.get('image3'))
        
        run()
        """
    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        """

class getId(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        ids = [person.id_mongo for person in Person.objects.all()]
        return Response(ids)

    def post(self, request, format=None):
        print(request.data.get('image'))
        image = to_image(request.data.get('image'))
       
        matching = prediction(image,model_path=os.path.join(settings.STATIC_ROOT+'classifier'))
        #matching = []
        if len(matching) == 0:
            return Response(data="unknown")
        return Response(data=matching[0][0])
    