from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.exceptions import NotAuthenticated
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

def toImage(base64_data):
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


def prediction(image, model_path=None, distance_threshold=0.5):
    """
    Recognizes an image from request 
    """
    new_face = face_recognition.load_image_file(image)
    new_face_locations = face_recognition.face_locations(new_face)

    if len(new_face_locations) == 0:
        return []

    new_faces_encodings = face_recognition.face_encodings(new_face, known_face_locations=new_face_locations)

    personas = Person.objects.all()
    for persona in personas:
        encoding1 = persona.image1.split(',')
        encoding1 = [float(item) for item in encoding1]
        match1 = face_recognition.compare_faces([encoding1], new_faces_encodings[0])
        if match1[0]:
            return persona.id_mongo

        encoding2 = persona.image2.split(',')
        encoding2 = [float(item) for item in encoding2]
        match2 = face_recognition.compare_faces([encoding2], new_faces_encodings[0])
        if match2[0]:
            return persona.id_mongo
            
        encoding3 = persona.image3.split(',')
        encoding3 = [float(item) for item in encoding3]
        match3 = face_recognition.compare_faces([encoding3], new_faces_encodings[0])
        if match3[0]:
            return persona.id_mongo

    return "unknown"


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    def perform_create(self, serializer):
        #Se reciben las imagenes en base64, se traspasan a archivo y se sacan los encodings para serializar
        image1 = toImage(self.request.data.get('image1'))
        image1 = face_recognition.face_encodings(face_recognition.load_image_file(image1))[0]
        image1 = ','.join(str(item) for item in image1)
        image2 = toImage(self.request.data.get('image2'))
        image2 = face_recognition.face_encodings(face_recognition.load_image_file(image2))[0]
        image2 = ','.join(str(item) for item in image2)
        image3 = toImage(self.request.data.get('image3'))
        image3 = face_recognition.face_encodings(face_recognition.load_image_file(image3))[0]
        image3 = ','.join(str(item) for item in image3)

        serializer.save(id_mongo=self.request.data.get('idMongo'),
                            image1=image1,
                            image2=image2,
                            image3=image3)


class getId(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        ids = [person.id_mongo for person in Person.objects.all()]
        return Response(ids)

    def post(self, request, format=None):
        #print(self.request.data.get('image'))
        image = toImage(self.request.data.get('image'))
        matching = prediction(image)
        #matching = []
        #if len(matching) == 0:
        #   print(len(matching))
        #   return Response(data="unknown", status=status.HTTP_401_UNAUTHORIZED)
        #return Response(data=matching[0][0])
    
        if matching == "unknown":
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(data={'data':matching})