from django.urls import path
from iotOnDjango.views import GatewayView

urlpatterns = [
    path('', GatewayView.index, name='index'),
	path('create', GatewayView.get, name='create'),
	path('get/<int:gatewayId>/', GatewayView.get, name='get'),
	path('save', GatewayView.save, name='save'),
	path('getAll', GatewayView.getAll, name='getAll'),
	path('delete/<int:gatewayId>/', GatewayView.delete, name='delete'),

	path('assignSite/<int:gatewayId>/<int:SiteId>/', GatewayView.assignSite, name='assignSite'),
	path('unassignSite/<int:gatewayId>/', GatewayView.unassignSite, name='unassignSite'),

	path('assignRoom/<int:gatewayId>/<int:RoomId>/', GatewayView.assignRoom, name='assignRoom'),
	path('unassignRoom/<int:gatewayId>/', GatewayView.unassignRoom, name='unassignRoom'),

	path('assignDigitalTwin/<int:gatewayId>/<int:DigitalTwinId>/', GatewayView.assignDigitalTwin, name='assignDigitalTwin'),
	path('unassignDigitalTwin/<int:gatewayId>/', GatewayView.unassignDigitalTwin, name='unassignDigitalTwin'),

	path('addDevices/<int:gatewayId>/<DevicesIds>/', GatewayView.addDevices, name='addDevices'),
	path('removeDevices/<int:gatewayId>/<DevicesIds>/', GatewayView.removeDevices, name='removeDevices'),

	path('addEdgeApplications/<int:gatewayId>/<EdgeApplicationsIds>/', GatewayView.addEdgeApplications, name='addEdgeApplications'),
	path('removeEdgeApplications/<int:gatewayId>/<EdgeApplicationsIds>/', GatewayView.removeEdgeApplications, name='removeEdgeApplications'),

	path('addCertificates/<int:gatewayId>/<CertificatesIds>/', GatewayView.addCertificates, name='addCertificates'),
	path('removeCertificates/<int:gatewayId>/<CertificatesIds>/', GatewayView.removeCertificates, name='removeCertificates'),

	path('addNetworkProfiles/<int:gatewayId>/<NetworkProfilesIds>/', GatewayView.addNetworkProfiles, name='addNetworkProfiles'),
	path('removeNetworkProfiles/<int:gatewayId>/<NetworkProfilesIds>/', GatewayView.removeNetworkProfiles, name='removeNetworkProfiles'),

]
