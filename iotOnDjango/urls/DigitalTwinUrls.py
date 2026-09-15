from django.urls import path
from iotOnDjango.views import DigitalTwinView

urlpatterns = [
    path('', DigitalTwinView.index, name='index'),
	path('create', DigitalTwinView.get, name='create'),
	path('get/<int:digitalTwinId>/', DigitalTwinView.get, name='get'),
	path('save', DigitalTwinView.save, name='save'),
	path('getAll', DigitalTwinView.getAll, name='getAll'),
	path('delete/<int:digitalTwinId>/', DigitalTwinView.delete, name='delete'),

	path('assignDevice/<int:digitalTwinId>/<int:DeviceId>/', DigitalTwinView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:digitalTwinId>/', DigitalTwinView.unassignDevice, name='unassignDevice'),

	path('assignGateway/<int:digitalTwinId>/<int:GatewayId>/', DigitalTwinView.assignGateway, name='assignGateway'),
	path('unassignGateway/<int:digitalTwinId>/', DigitalTwinView.unassignGateway, name='unassignGateway'),

	path('assignTemplate/<int:digitalTwinId>/<int:TemplateId>/', DigitalTwinView.assignTemplate, name='assignTemplate'),
	path('unassignTemplate/<int:digitalTwinId>/', DigitalTwinView.unassignTemplate, name='unassignTemplate'),

	path('addChangeEvents/<int:digitalTwinId>/<ChangeEventsIds>/', DigitalTwinView.addChangeEvents, name='addChangeEvents'),
	path('removeChangeEvents/<int:digitalTwinId>/<ChangeEventsIds>/', DigitalTwinView.removeChangeEvents, name='removeChangeEvents'),

]
