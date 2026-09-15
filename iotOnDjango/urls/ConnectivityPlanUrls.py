from django.urls import path
from iotOnDjango.views import ConnectivityPlanView

urlpatterns = [
    path('', ConnectivityPlanView.index, name='index'),
	path('create', ConnectivityPlanView.get, name='create'),
	path('get/<int:connectivityPlanId>/', ConnectivityPlanView.get, name='get'),
	path('save', ConnectivityPlanView.save, name='save'),
	path('getAll', ConnectivityPlanView.getAll, name='getAll'),
	path('delete/<int:connectivityPlanId>/', ConnectivityPlanView.delete, name='delete'),

	path('assignTenant/<int:connectivityPlanId>/<int:TenantId>/', ConnectivityPlanView.assignTenant, name='assignTenant'),
	path('unassignTenant/<int:connectivityPlanId>/', ConnectivityPlanView.unassignTenant, name='unassignTenant'),

	path('addSimCards/<int:connectivityPlanId>/<SimCardsIds>/', ConnectivityPlanView.addSimCards, name='addSimCards'),
	path('removeSimCards/<int:connectivityPlanId>/<SimCardsIds>/', ConnectivityPlanView.removeSimCards, name='removeSimCards'),

]
