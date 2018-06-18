from django.shortcuts import render
from rest_framework import viewsets
from face_rest.serializers import PersonImageSerializer, PersonSerializer
from face.models import Person, PersonImage

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonImageViewSet(viewsets.ModelViewSet):
    queryset = PersonImage.objects.all()
    serializer_class = PersonImageSerializer