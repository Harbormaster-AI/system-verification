from django.urls import path
from iotOnDjango.views import CommandDefinitionView

urlpatterns = [
    path('', CommandDefinitionView.index, name='index'),
	path('create', CommandDefinitionView.get, name='create'),
	path('get/<int:commandDefinitionId>/', CommandDefinitionView.get, name='get'),
	path('save', CommandDefinitionView.save, name='save'),
	path('getAll', CommandDefinitionView.getAll, name='getAll'),
	path('delete/<int:commandDefinitionId>/', CommandDefinitionView.delete, name='delete'),

	path('assignDeviceModel/<int:commandDefinitionId>/<int:DeviceModelId>/', CommandDefinitionView.assignDeviceModel, name='assignDeviceModel'),
	path('unassignDeviceModel/<int:commandDefinitionId>/', CommandDefinitionView.unassignDeviceModel, name='unassignDeviceModel'),

	path('addActuators/<int:commandDefinitionId>/<ActuatorsIds>/', CommandDefinitionView.addActuators, name='addActuators'),
	path('removeActuators/<int:commandDefinitionId>/<ActuatorsIds>/', CommandDefinitionView.removeActuators, name='removeActuators'),

	path('addCommandInvocations/<int:commandDefinitionId>/<CommandInvocationsIds>/', CommandDefinitionView.addCommandInvocations, name='addCommandInvocations'),
	path('removeCommandInvocations/<int:commandDefinitionId>/<CommandInvocationsIds>/', CommandDefinitionView.removeCommandInvocations, name='removeCommandInvocations'),

]
