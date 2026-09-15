from django.urls import path
from iotOnDjango.views import CommandInvocationView

urlpatterns = [
    path('', CommandInvocationView.index, name='index'),
	path('create', CommandInvocationView.get, name='create'),
	path('get/<int:commandInvocationId>/', CommandInvocationView.get, name='get'),
	path('save', CommandInvocationView.save, name='save'),
	path('getAll', CommandInvocationView.getAll, name='getAll'),
	path('delete/<int:commandInvocationId>/', CommandInvocationView.delete, name='delete'),

	path('assignDevice/<int:commandInvocationId>/<int:DeviceId>/', CommandInvocationView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:commandInvocationId>/', CommandInvocationView.unassignDevice, name='unassignDevice'),

	path('assignCommandDefinition/<int:commandInvocationId>/<int:CommandDefinitionId>/', CommandInvocationView.assignCommandDefinition, name='assignCommandDefinition'),
	path('unassignCommandDefinition/<int:commandInvocationId>/', CommandInvocationView.unassignCommandDefinition, name='unassignCommandDefinition'),

	path('assignActuator/<int:commandInvocationId>/<int:ActuatorId>/', CommandInvocationView.assignActuator, name='assignActuator'),
	path('unassignActuator/<int:commandInvocationId>/', CommandInvocationView.unassignActuator, name='unassignActuator'),

	path('assignUser/<int:commandInvocationId>/<int:UserId>/', CommandInvocationView.assignUser, name='assignUser'),
	path('unassignUser/<int:commandInvocationId>/', CommandInvocationView.unassignUser, name='unassignUser'),

]
