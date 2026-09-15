from django.urls import path
from iotOnDjango.views import TelemetrySchemaView

urlpatterns = [
    path('', TelemetrySchemaView.index, name='index'),
	path('create', TelemetrySchemaView.get, name='create'),
	path('get/<int:telemetrySchemaId>/', TelemetrySchemaView.get, name='get'),
	path('save', TelemetrySchemaView.save, name='save'),
	path('getAll', TelemetrySchemaView.getAll, name='getAll'),
	path('delete/<int:telemetrySchemaId>/', TelemetrySchemaView.delete, name='delete'),

	path('addStreams/<int:telemetrySchemaId>/<StreamsIds>/', TelemetrySchemaView.addStreams, name='addStreams'),
	path('removeStreams/<int:telemetrySchemaId>/<StreamsIds>/', TelemetrySchemaView.removeStreams, name='removeStreams'),

]
