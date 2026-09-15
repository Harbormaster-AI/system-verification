from django.urls import path
from iotOnDjango.views import EdgeApplicationView

urlpatterns = [
    path('', EdgeApplicationView.index, name='index'),
	path('create', EdgeApplicationView.get, name='create'),
	path('get/<int:edgeApplicationId>/', EdgeApplicationView.get, name='get'),
	path('save', EdgeApplicationView.save, name='save'),
	path('getAll', EdgeApplicationView.getAll, name='getAll'),
	path('delete/<int:edgeApplicationId>/', EdgeApplicationView.delete, name='delete'),

	path('assignGateway/<int:edgeApplicationId>/<int:GatewayId>/', EdgeApplicationView.assignGateway, name='assignGateway'),
	path('unassignGateway/<int:edgeApplicationId>/', EdgeApplicationView.unassignGateway, name='unassignGateway'),

]
