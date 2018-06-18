from rest_framework import serializers
from face.models import Person, PersonImage

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['pk', 'id_mongo','created','updated']

class PersonImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonImage
        fields = ['pk','person', 'image']