from django.urls import path
from iotOnDjango.views import TwinTemplateView

urlpatterns = [
    path('', TwinTemplateView.index, name='index'),
	path('create', TwinTemplateView.get, name='create'),
	path('get/<int:twinTemplateId>/', TwinTemplateView.get, name='get'),
	path('save', TwinTemplateView.save, name='save'),
	path('getAll', TwinTemplateView.getAll, name='getAll'),
	path('delete/<int:twinTemplateId>/', TwinTemplateView.delete, name='delete'),

	path('addDeviceModels/<int:twinTemplateId>/<DeviceModelsIds>/', TwinTemplateView.addDeviceModels, name='addDeviceModels'),
	path('removeDeviceModels/<int:twinTemplateId>/<DeviceModelsIds>/', TwinTemplateView.removeDeviceModels, name='removeDeviceModels'),

]
