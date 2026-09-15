from django.urls import path
from iotOnDjango.views import FloorView

urlpatterns = [
    path('', FloorView.index, name='index'),
	path('create', FloorView.get, name='create'),
	path('get/<int:floorId>/', FloorView.get, name='get'),
	path('save', FloorView.save, name='save'),
	path('getAll', FloorView.getAll, name='getAll'),
	path('delete/<int:floorId>/', FloorView.delete, name='delete'),

	path('assignBuilding/<int:floorId>/<int:BuildingId>/', FloorView.assignBuilding, name='assignBuilding'),
	path('unassignBuilding/<int:floorId>/', FloorView.unassignBuilding, name='unassignBuilding'),

	path('addRooms/<int:floorId>/<RoomsIds>/', FloorView.addRooms, name='addRooms'),
	path('removeRooms/<int:floorId>/<RoomsIds>/', FloorView.removeRooms, name='removeRooms'),

]
