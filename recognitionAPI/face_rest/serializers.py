from rest_framework import serializers
from face.models import Person
from drf_extra_fields.fields import Base64ImageField

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


class PersonSerializer(serializers.ModelSerializer):
    image1 = Base64ImageField(represent_in_base64=True)
    image2 = Base64ImageField(represent_in_base64=True)
    image3 = Base64ImageField(represent_in_base64=True)
    #image1 = serializers.ImageField(required=False)
    #image2 = serializers.ImageField(required=False)
    #image3 = serializers.ImageField(required=False)
    id_mongo = serializers.CharField(required=False)
    
    def save(self, **kwargs):
        # Will be done on every save
        kwargs['image1'] = to_image(kwargs['image1'])
        kwargs['image2'] = to_image(kwargs['image2'])
        kwargs['image3'] = to_image(kwargs['image3'])
        print("A guardar: ",kwargs['image3'])
        print("Id Mongo : ", kwargs['id_mongo'])
        return super().save(**kwargs)

    class Meta:
        model = Person
        fields = ['pk','created','updated','id_mongo','image1','image2','image3']

"""
    def create(validated_data):
        im1 = to_image(validated_data.pop('image1'))
        im2 = to_image(validated_data.pop('image2'))
        im3 = to_image(validated_data.pop('image3'))
        instance = Person.objects.create(validated_data.pop('id_mongo'))
        instance.image1 = im1
        instance.image2 = im2
        instance.image3 = im3
        return instance
 """   
    
