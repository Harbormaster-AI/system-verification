from django.urls import path
from iotOnDjango.views import SimCardView

urlpatterns = [
    path('', SimCardView.index, name='index'),
	path('create', SimCardView.get, name='create'),
	path('get/<int:simCardId>/', SimCardView.get, name='get'),
	path('save', SimCardView.save, name='save'),
	path('getAll', SimCardView.getAll, name='getAll'),
	path('delete/<int:simCardId>/', SimCardView.delete, name='delete'),

	path('assignTenant/<int:simCardId>/<int:TenantId>/', SimCardView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:simCardId>/', SimCardView.unassignTenant, name='unassignTenant'),

	path('assignConnectivityPlan/<int:simCardId>/<int:ConnectivityPlanId>/', SimCardView.assignConnectivityPlan, name='assignConnectivityPlan'),
	path('unassignConnectivityPlan/<int:simCardId>/', SimCardView.unassignConnectivityPlan, name='unassignConnectivityPlan'),

	path('addNetworkProfiles/<int:simCardId>/<NetworkProfilesIds>/', SimCardView.addNetworkProfiles, name='addNetworkProfiles'),
	path('removeNetworkProfiles/<int:simCardId>/<NetworkProfilesIds>/', SimCardView.removeNetworkProfiles, name='removeNetworkProfiles'),

]
