from rest_framework import serializers
from face.models import Person
from drf_extra_fields.fields import Base64ImageField

class PersonSerializer(serializers.ModelSerializer):
    #image1 = Base64ImageField()
    image1 = serializers.ImageField(required=False)
    image2 = serializers.ImageField(required=False)
    image3 = serializers.ImageField(required=False)
    id_mongo = serializers.IntegerField(required=False)
    class Meta:
        model = Person
        fields = ['pk','created','updated','id_mongo', 'image1', 'image2', 'image3']
