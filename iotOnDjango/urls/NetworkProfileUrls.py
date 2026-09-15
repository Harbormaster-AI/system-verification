from django.urls import path
from iotOnDjango.views import NetworkProfileView

urlpatterns = [
    path('', NetworkProfileView.index, name='index'),
	path('create', NetworkProfileView.get, name='create'),
	path('get/<int:networkProfileId>/', NetworkProfileView.get, name='get'),
	path('save', NetworkProfileView.save, name='save'),
	path('getAll', NetworkProfileView.getAll, name='getAll'),
	path('delete/<int:networkProfileId>/', NetworkProfileView.delete, name='delete'),

	path('assignDevice/<int:networkProfileId>/<int:DeviceId>/', NetworkProfileView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:networkProfileId>/', NetworkProfileView.unassignDevice, name='unassignDevice'),

	path('assignGateway/<int:networkProfileId>/<int:GatewayId>/', NetworkProfileView.assignGateway, name='assignGateway'),
	path('unassignGateway/<int:networkProfileId>/', NetworkProfileView.unassignGateway, name='unassignGateway'),

	path('assignSimCard/<int:networkProfileId>/<int:SimCardId>/', NetworkProfileView.assignSimCard, name='assignSimCard'),
	path('unassignSimCard/<int:networkProfileId>/', NetworkProfileView.unassignSimCard, name='unassignSimCard'),

]
