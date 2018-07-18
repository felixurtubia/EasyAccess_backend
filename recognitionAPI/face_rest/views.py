from django.shortcuts import render
from rest_framework import viewsets
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
        serializer.save(id_mongo=self.request.data.get('id_mongo'),
                            image1=self.request.data.get('image1'),
                            image2=self.request.data.get('image2'),
                            image3=self.request.data.get('image3'))
        print("Buenas nuevas, esto funciona")
        run()
    #permission_classes = [IsAccountAdminOrReadOnly]

class getId(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        ids = [person.id_mongo for person in Person.objects.all()]
        return Response(ids)

    def post(self, request, format=None):
        image = request.data.get('image')
        print(image)
        matching = prediction(image,model_path=os.path.join(settings.STATIC_ROOT+'classifier'))
        #matching = []
        if len(matching) == 0:
            return Response(data="unknown")
        return Response(data=matching)
    