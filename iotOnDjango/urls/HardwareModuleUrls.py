from django.urls import path
from iotOnDjango.views import HardwareModuleView

urlpatterns = [
    path('', HardwareModuleView.index, name='index'),
	path('create', HardwareModuleView.get, name='create'),
	path('get/<int:hardwareModuleId>/', HardwareModuleView.get, name='get'),
	path('save', HardwareModuleView.save, name='save'),
	path('getAll', HardwareModuleView.getAll, name='getAll'),
	path('delete/<int:hardwareModuleId>/', HardwareModuleView.delete, name='delete'),

	path('assignVendor/<int:hardwareModuleId>/<int:VendorId>/', HardwareModuleView.assignVendor, name='assignVendor'),
	path('unassignVendor/<int:hardwareModuleId>/', HardwareModuleView.unassignVendor, name='unassignVendor'),

]
