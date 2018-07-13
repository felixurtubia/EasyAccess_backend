from django.conf.urls import url, include
from rest_framework import routers
#from face_rest.views import PersonImageViewSet
from face_rest.views import PersonViewSet 
router = routers.DefaultRouter()
router.register('Persons', PersonViewSet, 'Persons' )
#router.register('PersonImages', PersonImageViewSet, 'PersonImages')

urlpatterns = [
    url(r'^', include(router.urls)),
]