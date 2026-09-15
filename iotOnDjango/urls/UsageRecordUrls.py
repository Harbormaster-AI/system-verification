from django.urls import path
from iotOnDjango.views import UsageRecordView

urlpatterns = [
    path('', UsageRecordView.index, name='index'),
	path('create', UsageRecordView.get, name='create'),
	path('get/<int:usageRecordId>/', UsageRecordView.get, name='get'),
	path('save', UsageRecordView.save, name='save'),
	path('getAll', UsageRecordView.getAll, name='getAll'),
	path('delete/<int:usageRecordId>/', UsageRecordView.delete, name='delete'),

	path('assignTenant/<int:usageRecordId>/<int:TenantId>/', UsageRecordView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:usageRecordId>/', UsageRecordView.unassignTenant, name='unassignTenant'),

	path('assignDevice/<int:usageRecordId>/<int:DeviceId>/', UsageRecordView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:usageRecordId>/', UsageRecordView.unassignDevice, name='unassignDevice'),

	path('assignConnectivityPlan/<int:usageRecordId>/<int:ConnectivityPlanId>/', UsageRecordView.assignConnectivityPlan, name='assignConnectivityPlan'),
	path('unassignConnectivityPlan/<int:usageRecordId>/', UsageRecordView.unassignConnectivityPlan, name='unassignConnectivityPlan'),

]
