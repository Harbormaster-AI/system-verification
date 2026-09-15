from django.urls import path
from iotOnDjango.views import DataRetentionPolicyView

urlpatterns = [
    path('', DataRetentionPolicyView.index, name='index'),
	path('create', DataRetentionPolicyView.get, name='create'),
	path('get/<int:dataRetentionPolicyId>/', DataRetentionPolicyView.get, name='get'),
	path('save', DataRetentionPolicyView.save, name='save'),
	path('getAll', DataRetentionPolicyView.getAll, name='getAll'),
	path('delete/<int:dataRetentionPolicyId>/', DataRetentionPolicyView.delete, name='delete'),

	path('assignTenant/<int:dataRetentionPolicyId>/<int:TenantId>/', DataRetentionPolicyView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:dataRetentionPolicyId>/', DataRetentionPolicyView.unassignTenant, name='unassignTenant'),

	path('addStreams/<int:dataRetentionPolicyId>/<StreamsIds>/', DataRetentionPolicyView.addStreams, name='addStreams'),
	path('removeStreams/<int:dataRetentionPolicyId>/<StreamsIds>/', DataRetentionPolicyView.removeStreams, name='removeStreams'),

]
