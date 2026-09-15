from django.urls import path
from iotOnDjango.views import AlertRuleView

urlpatterns = [
    path('', AlertRuleView.index, name='index'),
	path('create', AlertRuleView.get, name='create'),
	path('get/<int:alertRuleId>/', AlertRuleView.get, name='get'),
	path('save', AlertRuleView.save, name='save'),
	path('getAll', AlertRuleView.getAll, name='getAll'),
	path('delete/<int:alertRuleId>/', AlertRuleView.delete, name='delete'),

	path('assignTenant/<int:alertRuleId>/<int:TenantId>/', AlertRuleView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:alertRuleId>/', AlertRuleView.unassignTenant, name='unassignTenant'),

	path('addStreams/<int:alertRuleId>/<StreamsIds>/', AlertRuleView.addStreams, name='addStreams'),
	path('removeStreams/<int:alertRuleId>/<StreamsIds>/', AlertRuleView.removeStreams, name='removeStreams'),

	path('addAlerts/<int:alertRuleId>/<AlertsIds>/', AlertRuleView.addAlerts, name='addAlerts'),
	path('removeAlerts/<int:alertRuleId>/<AlertsIds>/', AlertRuleView.removeAlerts, name='removeAlerts'),

]
