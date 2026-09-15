from django.urls import path
from iotOnDjango.views import AlertView

urlpatterns = [
    path('', AlertView.index, name='index'),
	path('create', AlertView.get, name='create'),
	path('get/<int:alertId>/', AlertView.get, name='get'),
	path('save', AlertView.save, name='save'),
	path('getAll', AlertView.getAll, name='getAll'),
	path('delete/<int:alertId>/', AlertView.delete, name='delete'),

	path('assignDevice/<int:alertId>/<int:DeviceId>/', AlertView.assignDevice, name='assignDevice'),
	path('unassignDevice/<int:alertId>/', AlertView.unassignDevice, name='unassignDevice'),

	path('assignAlertRule/<int:alertId>/<int:AlertRuleId>/', AlertView.assignAlertRule, name='assignAlertRule'),
	path('unassignAlertRule/<int:alertId>/', AlertView.unassignAlertRule, name='unassignAlertRule'),

]
