from django.urls import path
from iotOnDjango.views import MaintenanceTicketView

urlpatterns = [
    path('', MaintenanceTicketView.index, name='index'),
	path('create', MaintenanceTicketView.get, name='create'),
	path('get/<int:maintenanceTicketId>/', MaintenanceTicketView.get, name='get'),
	path('save', MaintenanceTicketView.save, name='save'),
	path('getAll', MaintenanceTicketView.getAll, name='getAll'),
	path('delete/<int:maintenanceTicketId>/', MaintenanceTicketView.delete, name='delete'),

	path('assignDevice/<int:maintenanceTicketId>/<int:DeviceId>/', MaintenanceTicketView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:maintenanceTicketId>/', MaintenanceTicketView.unassignDevice, name='unassignDevice'),

	path('assignTenant/<int:maintenanceTicketId>/<int:TenantId>/', MaintenanceTicketView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:maintenanceTicketId>/', MaintenanceTicketView.unassignTenant, name='unassignTenant'),

]
