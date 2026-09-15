from django.urls import path
from iotOnDjango.views import SiteView

urlpatterns = [
    path('', SiteView.index, name='index'),
	path('create', SiteView.get, name='create'),
	path('get/<int:siteId>/', SiteView.get, name='get'),
	path('save', SiteView.save, name='save'),
	path('getAll', SiteView.getAll, name='getAll'),
	path('delete/<int:siteId>/', SiteView.delete, name='delete'),

	path('assignTenant/<int:siteId>/<int:TenantId>/', SiteView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:siteId>/', SiteView.unassignTenant, name='unassignTenant'),

	path('addBuildings/<int:siteId>/<BuildingsIds>/', SiteView.addBuildings, name='addBuildings'),
	path('removeBuildings/<int:siteId>/<BuildingsIds>/', SiteView.removeBuildings, name='removeBuildings'),

	path('addDevices/<int:siteId>/<DevicesIds>/', SiteView.addDevices, name='addDevices'),
	path('removeDevices/<int:siteId>/<DevicesIds>/', SiteView.removeDevices, name='removeDevices'),

	path('addGateways/<int:siteId>/<GatewaysIds>/', SiteView.addGateways, name='addGateways'),
	path('removeGateways/<int:siteId>/<GatewaysIds>/', SiteView.removeGateways, name='removeGateways'),

]
