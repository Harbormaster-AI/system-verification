from django.urls import path
from iotOnDjango.views import ProvisioningRecordView

urlpatterns = [
    path('', ProvisioningRecordView.index, name='index'),
	path('create', ProvisioningRecordView.get, name='create'),
	path('get/<int:provisioningRecordId>/', ProvisioningRecordView.get, name='get'),
	path('save', ProvisioningRecordView.save, name='save'),
	path('getAll', ProvisioningRecordView.getAll, name='getAll'),
	path('delete/<int:provisioningRecordId>/', ProvisioningRecordView.delete, name='delete'),

	path('assignDevice/<int:provisioningRecordId>/<int:DeviceId>/', ProvisioningRecordView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:provisioningRecordId>/', ProvisioningRecordView.unassignDevice, name='unassignDevice'),

	path('assignCertificate/<int:provisioningRecordId>/<int:CertificateId>/', ProvisioningRecordView.assignCertificate, name='assignCertificate'),
	path('unassignCertificate/<int:provisioningRecordId>/', ProvisioningRecordView.unassignCertificate, name='unassignCertificate'),

	path('assignTenant/<int:provisioningRecordId>/<int:TenantId>/', ProvisioningRecordView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:provisioningRecordId>/', ProvisioningRecordView.unassignTenant, name='unassignTenant'),

]
