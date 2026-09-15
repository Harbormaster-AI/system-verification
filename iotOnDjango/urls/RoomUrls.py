from django.urls import path
from iotOnDjango.views import RoomView

urlpatterns = [
    path('', RoomView.index, name='index'),
	path('create', RoomView.get, name='create'),
	path('get/<int:roomId>/', RoomView.get, name='get'),
	path('save', RoomView.save, name='save'),
	path('getAll', RoomView.getAll, name='getAll'),
	path('delete/<int:roomId>/', RoomView.delete, name='delete'),

	path('assignFloor/<int:roomId>/<int:FloorId>/', RoomView.assignFloor, name='assignFloor'),
	path('unassignFloor/<int:roomId>/', RoomView.unassignFloor, name='unassignFloor'),

	path('addDevices/<int:roomId>/<DevicesIds>/', RoomView.addDevices, name='addDevices'),
	path('removeDevices/<int:roomId>/<DevicesIds>/', RoomView.removeDevices, name='removeDevices'),

	path('addGateways/<int:roomId>/<GatewaysIds>/', RoomView.addGateways, name='addGateways'),
	path('removeGateways/<int:roomId>/<GatewaysIds>/', RoomView.removeGateways, name='removeGateways'),

]
