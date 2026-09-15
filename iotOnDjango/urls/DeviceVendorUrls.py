from django.urls import path
from iotOnDjango.views import DeviceVendorView

urlpatterns = [
    path('', DeviceVendorView.index, name='index'),
	path('create', DeviceVendorView.get, name='create'),
	path('get/<int:deviceVendorId>/', DeviceVendorView.get, name='get'),
	path('save', DeviceVendorView.save, name='save'),
	path('getAll', DeviceVendorView.getAll, name='getAll'),
	path('delete/<int:deviceVendorId>/', DeviceVendorView.delete, name='delete'),

	path('addDeviceModels/<int:deviceVendorId>/<DeviceModelsIds>/', DeviceVendorView.addDeviceModels, name='addDeviceModels'),
	path('removeDeviceModels/<int:deviceVendorId>/<DeviceModelsIds>/', DeviceVendorView.removeDeviceModels, name='removeDeviceModels'),

	path('addFirmwareReleases/<int:deviceVendorId>/<FirmwareReleasesIds>/', DeviceVendorView.addFirmwareReleases, name='addFirmwareReleases'),
	path('removeFirmwareReleases/<int:deviceVendorId>/<FirmwareReleasesIds>/', DeviceVendorView.removeFirmwareReleases, name='removeFirmwareReleases'),

	path('addHardwareModules/<int:deviceVendorId>/<HardwareModulesIds>/', DeviceVendorView.addHardwareModules, name='addHardwareModules'),
	path('removeHardwareModules/<int:deviceVendorId>/<HardwareModulesIds>/', DeviceVendorView.removeHardwareModules, name='removeHardwareModules'),

]
