from django.urls import path
from iotOnDjango.views import TenantUserView

urlpatterns = [
    path('', TenantUserView.index, name='index'),
	path('create', TenantUserView.get, name='create'),
	path('get/<int:tenantUserId>/', TenantUserView.get, name='get'),
	path('save', TenantUserView.save, name='save'),
	path('getAll', TenantUserView.getAll, name='getAll'),
	path('delete/<int:tenantUserId>/', TenantUserView.delete, name='delete'),

	path('assignTenant/<int:tenantUserId>/<int:TenantId>/', TenantUserView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:tenantUserId>/', TenantUserView.unassignTenant, name='unassignTenant'),

	path('addCommandInvocations/<int:tenantUserId>/<CommandInvocationsIds>/', TenantUserView.addCommandInvocations, name='addCommandInvocations'),
	path('removeCommandInvocations/<int:tenantUserId>/<CommandInvocationsIds>/', TenantUserView.removeCommandInvocations, name='removeCommandInvocations'),

]
