from django.urls import path
from iotOnDjango.views import TelemetryStreamView

urlpatterns = [
    path('', TelemetryStreamView.index, name='index'),
	path('create', TelemetryStreamView.get, name='create'),
	path('get/<int:telemetryStreamId>/', TelemetryStreamView.get, name='get'),
	path('save', TelemetryStreamView.save, name='save'),
	path('getAll', TelemetryStreamView.getAll, name='getAll'),
	path('delete/<int:telemetryStreamId>/', TelemetryStreamView.delete, name='delete'),

	path('assignDevice/<int:telemetryStreamId>/<int:DeviceId>/', TelemetryStreamView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:telemetryStreamId>/', TelemetryStreamView.unassignDevice, name='unassignDevice'),

	path('assignSensor/<int:telemetryStreamId>/<int:SensorId>/', TelemetryStreamView.assignSensor, name='assignSensor'),
	path('unassignSensor/<int:telemetryStreamId>/', TelemetryStreamView.unassignSensor, name='unassignSensor'),

	path('assignSchema/<int:telemetryStreamId>/<int:SchemaId>/', TelemetryStreamView.assignSchema, name='assignSchema'),
	path('unassignSchema/<int:telemetryStreamId>/', TelemetryStreamView.unassignSchema, name='unassignSchema'),

	path('assignMessagingEndpoint/<int:telemetryStreamId>/<int:MessagingEndpointId>/', TelemetryStreamView.assignMessagingEndpoint, name='assignMessagingEndpoint'),
	path('unassignMessagingEndpoint/<int:telemetryStreamId>/', TelemetryStreamView.unassignMessagingEndpoint, name='unassignMessagingEndpoint'),

	path('assignRetentionPolicy/<int:telemetryStreamId>/<int:RetentionPolicyId>/', TelemetryStreamView.assignRetentionPolicy, name='assignRetentionPolicy'),
	path('unassignRetentionPolicy/<int:telemetryStreamId>/', TelemetryStreamView.unassignRetentionPolicy, name='unassignRetentionPolicy'),

]
