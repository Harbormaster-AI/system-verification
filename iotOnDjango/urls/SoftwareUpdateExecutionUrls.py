from django.urls import path
from iotOnDjango.views import SoftwareUpdateExecutionView

urlpatterns = [
    path('', SoftwareUpdateExecutionView.index, name='index'),
	path('create', SoftwareUpdateExecutionView.get, name='create'),
	path('get/<int:softwareUpdateExecutionId>/', SoftwareUpdateExecutionView.get, name='get'),
	path('save', SoftwareUpdateExecutionView.save, name='save'),
	path('getAll', SoftwareUpdateExecutionView.getAll, name='getAll'),
	path('delete/<int:softwareUpdateExecutionId>/', SoftwareUpdateExecutionView.delete, name='delete'),

	path('assignCampaign/<int:softwareUpdateExecutionId>/<int:CampaignId>/', SoftwareUpdateExecutionView.assignCampaign, name='assignCampaign'),
	path('unassignCampaign/<int:softwareUpdateExecutionId>/', SoftwareUpdateExecutionView.unassignCampaign, name='unassignCampaign'),

	path('assignDevice/<int:softwareUpdateExecutionId>/<int:DeviceId>/', SoftwareUpdateExecutionView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:softwareUpdateExecutionId>/', SoftwareUpdateExecutionView.unassignDevice, name='unassignDevice'),

]
