from django.urls import path
from iotOnDjango.views import DeviceModelView

urlpatterns = [
    path('', DeviceModelView.index, name='index'),
	path('create', DeviceModelView.get, name='create'),
	path('get/<int:deviceModelId>/', DeviceModelView.get, name='get'),
	path('save', DeviceModelView.save, name='save'),
	path('getAll', DeviceModelView.getAll, name='getAll'),
	path('delete/<int:deviceModelId>/', DeviceModelView.delete, name='delete'),

	path('assignVendor/<int:deviceModelId>/<int:VendorId>/', DeviceModelView.assignVendor, name='assignVendor'),
	path('unassignVendor/<int:deviceModelId>/', DeviceModelView.unassignVendor, name='unassignVendor'),

	path('assignTwinTemplate/<int:deviceModelId>/<int:TwinTemplateId>/', DeviceModelView.assignTwinTemplate, name='assignTwinTemplate'),
	path('unassignTwinTemplate/<int:deviceModelId>/', DeviceModelView.unassignTwinTemplate, name='unassignTwinTemplate'),

	path('addHardwareModules/<int:deviceModelId>/<HardwareModulesIds>/', DeviceModelView.addHardwareModules, name='addHardwareModules'),
	path('removeHardwareModules/<int:deviceModelId>/<HardwareModulesIds>/', DeviceModelView.removeHardwareModules, name='removeHardwareModules'),

	path('addFirmwareReleases/<int:deviceModelId>/<FirmwareReleasesIds>/', DeviceModelView.addFirmwareReleases, name='addFirmwareReleases'),
	path('removeFirmwareReleases/<int:deviceModelId>/<FirmwareReleasesIds>/', DeviceModelView.removeFirmwareReleases, name='removeFirmwareReleases'),

	path('addCommandDefinitions/<int:deviceModelId>/<CommandDefinitionsIds>/', DeviceModelView.addCommandDefinitions, name='addCommandDefinitions'),
	path('removeCommandDefinitions/<int:deviceModelId>/<CommandDefinitionsIds>/', DeviceModelView.removeCommandDefinitions, name='removeCommandDefinitions'),

]
