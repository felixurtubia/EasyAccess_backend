from django.db import models

# Create your models here.

def person_directory_path(instance, filename):
    """
    Se cambia el nombre de la imagen de cada persona por '<id_mongo>_<n° de imagen>'
    """
    extension = filename.split(".")[-1]
    return '{}_{}.{}'.format(
                            instance.person.id_mongo, 
                            instance.person.Image.count()+1, 
                            extension)

class Person(models.Model):
    """
    Clase para guardar datos de cada persona agregada al modelo, se guarda la fecha de creación,
    la fecha de actualización y el id que tiene la persona en mongodb (eso es lo que se entrega)
    """
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    id_mongo = models.IntegerField(unique=True)

    class Meta:
        ordering = ('created',)

class PersonImage(models.Model):
    """
    Clase para guardar las imágenes de cada persona, se guardan en MEDIA_ROOT,
    utilizando la funcion 'person_directory_path para cambiar el nombre'
    """
    person = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name='Image'
    )
    image = models.ImageField(upload_to=person_directory_path)
