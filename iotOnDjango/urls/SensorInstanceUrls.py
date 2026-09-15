from django.urls import path
from iotOnDjango.views import SensorInstanceView

urlpatterns = [
    path('', SensorInstanceView.index, name='index'),
	path('create', SensorInstanceView.get, name='create'),
	path('get/<int:sensorInstanceId>/', SensorInstanceView.get, name='get'),
	path('save', SensorInstanceView.save, name='save'),
	path('getAll', SensorInstanceView.getAll, name='getAll'),
	path('delete/<int:sensorInstanceId>/', SensorInstanceView.delete, name='delete'),

	path('assignDevice/<int:sensorInstanceId>/<int:DeviceId>/', SensorInstanceView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:sensorInstanceId>/', SensorInstanceView.unassignDevice, name='unassignDevice'),

	path('addTelemetryStreams/<int:sensorInstanceId>/<TelemetryStreamsIds>/', SensorInstanceView.addTelemetryStreams, name='addTelemetryStreams'),
	path('removeTelemetryStreams/<int:sensorInstanceId>/<TelemetryStreamsIds>/', SensorInstanceView.removeTelemetryStreams, name='removeTelemetryStreams'),

]
