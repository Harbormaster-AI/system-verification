from django.urls import path
from iotOnDjango.views import FirmwareReleaseView

urlpatterns = [
    path('', FirmwareReleaseView.index, name='index'),
	path('create', FirmwareReleaseView.get, name='create'),
	path('get/<int:firmwareReleaseId>/', FirmwareReleaseView.get, name='get'),
	path('save', FirmwareReleaseView.save, name='save'),
	path('getAll', FirmwareReleaseView.getAll, name='getAll'),
	path('delete/<int:firmwareReleaseId>/', FirmwareReleaseView.delete, name='delete'),

	path('assignDeviceModel/<int:firmwareReleaseId>/<int:DeviceModelId>/', FirmwareReleaseView.assignDeviceModel, name='assignDeviceModel'),
	path('unassignDeviceModel/<int:firmwareReleaseId>/', FirmwareReleaseView.unassignDeviceModel, name='unassignDeviceModel'),

]
