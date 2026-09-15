from django.urls import path
from iotOnDjango.views import ActuatorInstanceView

urlpatterns = [
    path('', ActuatorInstanceView.index, name='index'),
	path('create', ActuatorInstanceView.get, name='create'),
	path('get/<int:actuatorInstanceId>/', ActuatorInstanceView.get, name='get'),
	path('save', ActuatorInstanceView.save, name='save'),
	path('getAll', ActuatorInstanceView.getAll, name='getAll'),
	path('delete/<int:actuatorInstanceId>/', ActuatorInstanceView.delete, name='delete'),

	path('assignDevice/<int:actuatorInstanceId>/<int:DeviceId>/', ActuatorInstanceView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:actuatorInstanceId>/', ActuatorInstanceView.unassignDevice, name='unassignDevice'),

	path('addSupportedCommands/<int:actuatorInstanceId>/<SupportedCommandsIds>/', ActuatorInstanceView.addSupportedCommands, name='addSupportedCommands'),
	path('removeSupportedCommands/<int:actuatorInstanceId>/<SupportedCommandsIds>/', ActuatorInstanceView.removeSupportedCommands, name='removeSupportedCommands'),

]
