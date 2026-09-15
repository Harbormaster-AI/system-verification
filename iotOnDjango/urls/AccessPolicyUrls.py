from django.urls import path
from iotOnDjango.views import AccessPolicyView

urlpatterns = [
    path('', AccessPolicyView.index, name='index'),
	path('create', AccessPolicyView.get, name='create'),
	path('get/<int:accessPolicyId>/', AccessPolicyView.get, name='get'),
	path('save', AccessPolicyView.save, name='save'),
	path('getAll', AccessPolicyView.getAll, name='getAll'),
	path('delete/<int:accessPolicyId>/', AccessPolicyView.delete, name='delete'),

	path('assignTenant/<int:accessPolicyId>/<int:TenantId>/', AccessPolicyView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:accessPolicyId>/', AccessPolicyView.unassignTenant, name='unassignTenant'),

	path('addApiKeys/<int:accessPolicyId>/<ApiKeysIds>/', AccessPolicyView.addApiKeys, name='addApiKeys'),
	path('removeApiKeys/<int:accessPolicyId>/<ApiKeysIds>/', AccessPolicyView.removeApiKeys, name='removeApiKeys'),

	path('addUsers/<int:accessPolicyId>/<UsersIds>/', AccessPolicyView.addUsers, name='addUsers'),
	path('removeUsers/<int:accessPolicyId>/<UsersIds>/', AccessPolicyView.removeUsers, name='removeUsers'),

]
