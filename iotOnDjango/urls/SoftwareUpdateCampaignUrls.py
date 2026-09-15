from django.urls import path
from iotOnDjango.views import SoftwareUpdateCampaignView

urlpatterns = [
    path('', SoftwareUpdateCampaignView.index, name='index'),
	path('create', SoftwareUpdateCampaignView.get, name='create'),
	path('get/<int:softwareUpdateCampaignId>/', SoftwareUpdateCampaignView.get, name='get'),
	path('save', SoftwareUpdateCampaignView.save, name='save'),
	path('getAll', SoftwareUpdateCampaignView.getAll, name='getAll'),
	path('delete/<int:softwareUpdateCampaignId>/', SoftwareUpdateCampaignView.delete, name='delete'),

	path('assignFirmwareRelease/<int:softwareUpdateCampaignId>/<int:FirmwareReleaseId>/', SoftwareUpdateCampaignView.assignFirmwareRelease, name='assignFirmwareRelease'),
	path('unassignFirmwareRelease/<int:softwareUpdateCampaignId>/', SoftwareUpdateCampaignView.unassignFirmwareRelease, name='unassignFirmwareRelease'),

	path('assignDeviceGroup/<int:softwareUpdateCampaignId>/<int:DeviceGroupId>/', SoftwareUpdateCampaignView.assignDeviceGroup, name='assignDeviceGroup'),
	path('unassignDeviceGroup/<int:softwareUpdateCampaignId>/', SoftwareUpdateCampaignView.unassignDeviceGroup, name='unassignDeviceGroup'),

	path('addExecutions/<int:softwareUpdateCampaignId>/<ExecutionsIds>/', SoftwareUpdateCampaignView.addExecutions, name='addExecutions'),
	path('removeExecutions/<int:softwareUpdateCampaignId>/<ExecutionsIds>/', SoftwareUpdateCampaignView.removeExecutions, name='removeExecutions'),

]
