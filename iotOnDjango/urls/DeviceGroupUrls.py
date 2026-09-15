from django.urls import path
from iotOnDjango.views import DeviceGroupView

urlpatterns = [
    path('', DeviceGroupView.index, name='index'),
	path('create', DeviceGroupView.get, name='create'),
	path('get/<int:deviceGroupId>/', DeviceGroupView.get, name='get'),
	path('save', DeviceGroupView.save, name='save'),
	path('getAll', DeviceGroupView.getAll, name='getAll'),
	path('delete/<int:deviceGroupId>/', DeviceGroupView.delete, name='delete'),

	path('assignTenant/<int:deviceGroupId>/<int:TenantId>/', DeviceGroupView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:deviceGroupId>/', DeviceGroupView.unassignTenant, name='unassignTenant'),

	path('addDevices/<int:deviceGroupId>/<DevicesIds>/', DeviceGroupView.addDevices, name='addDevices'),
	path('removeDevices/<int:deviceGroupId>/<DevicesIds>/', DeviceGroupView.removeDevices, name='removeDevices'),

]
