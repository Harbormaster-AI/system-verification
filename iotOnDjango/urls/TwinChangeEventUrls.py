from django.urls import path
from iotOnDjango.views import TwinChangeEventView

urlpatterns = [
    path('', TwinChangeEventView.index, name='index'),
	path('create', TwinChangeEventView.get, name='create'),
	path('get/<int:twinChangeEventId>/', TwinChangeEventView.get, name='get'),
	path('save', TwinChangeEventView.save, name='save'),
	path('getAll', TwinChangeEventView.getAll, name='getAll'),
	path('delete/<int:twinChangeEventId>/', TwinChangeEventView.delete, name='delete'),

	path('assignTwin/<int:twinChangeEventId>/<int:TwinId>/', TwinChangeEventView.assignTwin, name='assignTwin'),
	path('unassignTwin/<int:twinChangeEventId>/', TwinChangeEventView.unassignTwin, name='unassignTwin'),

]
