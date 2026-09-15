from django.urls import path
from iotOnDjango.views import BuildingView

urlpatterns = [
    path('', BuildingView.index, name='index'),
	path('create', BuildingView.get, name='create'),
	path('get/<int:buildingId>/', BuildingView.get, name='get'),
	path('save', BuildingView.save, name='save'),
	path('getAll', BuildingView.getAll, name='getAll'),
	path('delete/<int:buildingId>/', BuildingView.delete, name='delete'),

	path('assignSite/<int:buildingId>/<int:SiteId>/', BuildingView.assignSite, name='assignSite'),
	path('unassignSite/<int:buildingId>/', BuildingView.unassignSite, name='unassignSite'),

	path('addFloors/<int:buildingId>/<FloorsIds>/', BuildingView.addFloors, name='addFloors'),
	path('removeFloors/<int:buildingId>/<FloorsIds>/', BuildingView.removeFloors, name='removeFloors'),

]
