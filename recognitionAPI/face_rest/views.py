from django.shortcuts import render
from rest_framework import viewsets
#rom face_rest.serializers import PersonImageSerializer
from face_rest.serializers import PersonSerializer
from face.models import Person#, PersonImage
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.response import Response


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        serializer.save(id_mongo=self.request.data.get('id_mongo'),
                            image1=self.request.data.get('image1'),
                            image2=self.request.data.get('image2'),
                            image3=self.request.data.get('image3'))
        print("Buenas nuevas, esto funciona")
    #permission_classes = [IsAccountAdminOrReadOnly]

class ListUsers(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)

    def POST(self, request, format=None):
        return({'message':"Get some data!", "data":request.data})
    