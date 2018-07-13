from rest_framework import serializers
from face.models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['pk', 'id_mongo','image1','image2','image3','created','updated']

"""class PersonImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonImage
        fields = ['pk','person', 'image']

"""