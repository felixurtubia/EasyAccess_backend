from django.shortcuts import render
from rest_framework import viewsets
#rom face_rest.serializers import PersonImageSerializer
from face_rest.serializers import PersonSerializer
from face.models import Person#, PersonImage

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    #permission_classes = [IsAccountAdminOrReadOnly]

    print("peticion a person view set")


"""class PersonImageViewSet(viewsets.ModelViewSet):
    queryset = PersonImage.objects.all()
    serializer_class = PersonImageSerializer
    """
    