from django.urls import path
from iotOnDjango.views import MessagingEndpointView

urlpatterns = [
    path('', MessagingEndpointView.index, name='index'),
	path('create', MessagingEndpointView.get, name='create'),
	path('get/<int:messagingEndpointId>/', MessagingEndpointView.get, name='get'),
	path('save', MessagingEndpointView.save, name='save'),
	path('getAll', MessagingEndpointView.getAll, name='getAll'),
	path('delete/<int:messagingEndpointId>/', MessagingEndpointView.delete, name='delete'),

	path('assignTenant/<int:messagingEndpointId>/<int:TenantId>/', MessagingEndpointView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:messagingEndpointId>/', MessagingEndpointView.unassignTenant, name='unassignTenant'),

	path('addStreams/<int:messagingEndpointId>/<StreamsIds>/', MessagingEndpointView.addStreams, name='addStreams'),
	path('removeStreams/<int:messagingEndpointId>/<StreamsIds>/', MessagingEndpointView.removeStreams, name='removeStreams'),

]
