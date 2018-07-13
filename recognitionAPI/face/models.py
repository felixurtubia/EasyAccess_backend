from django.db import models

# Create your models here.

def person_directory_path_1(instance, filename):
    """
    Se cambia el nombre de la imagen de cada persona por '<id_mongo>_<n° de imagen>'
    """
    extension = filename.split(".")[-1]
    return '{}_{}.{}'.format(
                            instance.id_mongo, 
                            1, 
                            extension)

def person_directory_path_2(instance, filename):
    """
    Se cambia el nombre de la imagen de cada persona por '<id_mongo>_<n° de imagen>'
    """
    extension = filename.split(".")[-1]
    return '{}_{}.{}'.format(
                            instance.id_mongo, 
                            2, 
                            extension)

def person_directory_path_3(instance, filename):
    """
    Se cambia el nombre de la imagen de cada persona por '<id_mongo>_<n° de imagen>'
    """
    extension = filename.split(".")[-1]
    return '{}_{}.{}'.format(
                            instance.id_mongo, 
                            3, 
                            extension)                            

class Person(models.Model):
    """
    Clase para guardar datos de cada persona agregada al modelo, se guarda la fecha de creación,
    la fecha de actualización y el id que tiene la persona en mongodb (eso es lo que se entrega)
    """
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    id_mongo = models.IntegerField(unique=True)
    image1 = models.ImageField(upload_to=person_directory_path_1)
    image2 = models.ImageField(upload_to=person_directory_path_2)
    image3 = models.ImageField(upload_to=person_directory_path_3)

    class Meta:
        ordering = ('created',)
