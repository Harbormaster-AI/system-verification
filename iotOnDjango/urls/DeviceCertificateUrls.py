from django.urls import path
from iotOnDjango.views import DeviceCertificateView

urlpatterns = [
    path('', DeviceCertificateView.index, name='index'),
	path('create', DeviceCertificateView.get, name='create'),
	path('get/<int:deviceCertificateId>/', DeviceCertificateView.get, name='get'),
	path('save', DeviceCertificateView.save, name='save'),
	path('getAll', DeviceCertificateView.getAll, name='getAll'),
	path('delete/<int:deviceCertificateId>/', DeviceCertificateView.delete, name='delete'),

	path('assignDevice/<int:deviceCertificateId>/<int:DeviceId>/', DeviceCertificateView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:deviceCertificateId>/', DeviceCertificateView.unassignDevice, name='unassignDevice'),

	path('assignGateway/<int:deviceCertificateId>/<int:GatewayId>/', DeviceCertificateView.assignGateway, name='assignGateway'),
	path('unassignGateway/<int:deviceCertificateId>/', DeviceCertificateView.unassignGateway, name='unassignGateway'),

]
