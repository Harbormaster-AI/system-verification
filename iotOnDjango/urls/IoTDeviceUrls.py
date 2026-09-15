from django.urls import path
from iotOnDjango.views import IoTDeviceView

urlpatterns = [
    path('', IoTDeviceView.index, name='index'),
	path('create', IoTDeviceView.get, name='create'),
	path('get/<int:ioTDeviceId>/', IoTDeviceView.get, name='get'),
	path('save', IoTDeviceView.save, name='save'),
	path('getAll', IoTDeviceView.getAll, name='getAll'),
	path('delete/<int:ioTDeviceId>/', IoTDeviceView.delete, name='delete'),

	path('assignDeviceModel/<int:ioTDeviceId>/<int:DeviceModelId>/', IoTDeviceView.assignDeviceModel, name='assignDeviceModel'),
	path('unassignDeviceModel/<int:ioTDeviceId>/', IoTDeviceView.unassignDeviceModel, name='unassignDeviceModel'),

	path('assignTenant/<int:ioTDeviceId>/<int:TenantId>/', IoTDeviceView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:ioTDeviceId>/', IoTDeviceView.unassignTenant, name='unassignTenant'),

	path('assignSite/<int:ioTDeviceId>/<int:SiteId>/', IoTDeviceView.assignSite, name='assignSite'),
	path('unassignSite/<int:ioTDeviceId>/', IoTDeviceView.unassignSite, name='unassignSite'),

	path('assignRoom/<int:ioTDeviceId>/<int:RoomId>/', IoTDeviceView.assignRoom, name='assignRoom'),
	path('unassignRoom/<int:ioTDeviceId>/', IoTDeviceView.unassignRoom, name='unassignRoom'),

	path('assignGateway/<int:ioTDeviceId>/<int:GatewayId>/', IoTDeviceView.assignGateway, name='assignGateway'),
	path('unassignGateway/<int:ioTDeviceId>/', IoTDeviceView.unassignGateway, name='unassignGateway'),

	path('assignDigitalTwin/<int:ioTDeviceId>/<int:DigitalTwinId>/', IoTDeviceView.assignDigitalTwin, name='assignDigitalTwin'),
	path('unassignDigitalTwin/<int:ioTDeviceId>/', IoTDeviceView.unassignDigitalTwin, name='unassignDigitalTwin'),

	path('assignProvisioningRecord/<int:ioTDeviceId>/<int:ProvisioningRecordId>/', IoTDeviceView.assignProvisioningRecord, name='assignProvisioningRecord'),
	path('unassignProvisioningRecord/<int:ioTDeviceId>/', IoTDeviceView.unassignProvisioningRecord, name='unassignProvisioningRecord'),

	path('addSensors/<int:ioTDeviceId>/<SensorsIds>/', IoTDeviceView.addSensors, name='addSensors'),
	path('removeSensors/<int:ioTDeviceId>/<SensorsIds>/', IoTDeviceView.removeSensors, name='removeSensors'),

	path('addActuators/<int:ioTDeviceId>/<ActuatorsIds>/', IoTDeviceView.addActuators, name='addActuators'),
	path('removeActuators/<int:ioTDeviceId>/<ActuatorsIds>/', IoTDeviceView.removeActuators, name='removeActuators'),

	path('addCertificates/<int:ioTDeviceId>/<CertificatesIds>/', IoTDeviceView.addCertificates, name='addCertificates'),
	path('removeCertificates/<int:ioTDeviceId>/<CertificatesIds>/', IoTDeviceView.removeCertificates, name='removeCertificates'),

	path('addTelemetryStreams/<int:ioTDeviceId>/<TelemetryStreamsIds>/', IoTDeviceView.addTelemetryStreams, name='addTelemetryStreams'),
	path('removeTelemetryStreams/<int:ioTDeviceId>/<TelemetryStreamsIds>/', IoTDeviceView.removeTelemetryStreams, name='removeTelemetryStreams'),

	path('addCommandInvocations/<int:ioTDeviceId>/<CommandInvocationsIds>/', IoTDeviceView.addCommandInvocations, name='addCommandInvocations'),
	path('removeCommandInvocations/<int:ioTDeviceId>/<CommandInvocationsIds>/', IoTDeviceView.removeCommandInvocations, name='removeCommandInvocations'),

	path('addAlerts/<int:ioTDeviceId>/<AlertsIds>/', IoTDeviceView.addAlerts, name='addAlerts'),
	path('removeAlerts/<int:ioTDeviceId>/<AlertsIds>/', IoTDeviceView.removeAlerts, name='removeAlerts'),

	path('addDeviceGroups/<int:ioTDeviceId>/<DeviceGroupsIds>/', IoTDeviceView.addDeviceGroups, name='addDeviceGroups'),
	path('removeDeviceGroups/<int:ioTDeviceId>/<DeviceGroupsIds>/', IoTDeviceView.removeDeviceGroups, name='removeDeviceGroups'),

	path('addNetworkProfiles/<int:ioTDeviceId>/<NetworkProfilesIds>/', IoTDeviceView.addNetworkProfiles, name='addNetworkProfiles'),
	path('removeNetworkProfiles/<int:ioTDeviceId>/<NetworkProfilesIds>/', IoTDeviceView.removeNetworkProfiles, name='removeNetworkProfiles'),

]
