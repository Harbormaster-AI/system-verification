from django.urls import path
from iotOnDjango.views import ApiKeyView

urlpatterns = [
    path('', ApiKeyView.index, name='index'),
	path('create', ApiKeyView.get, name='create'),
	path('get/<int:apiKeyId>/', ApiKeyView.get, name='get'),
	path('save', ApiKeyView.save, name='save'),
	path('getAll', ApiKeyView.getAll, name='getAll'),
	path('delete/<int:apiKeyId>/', ApiKeyView.delete, name='delete'),

	path('assignAccessPolicy/<int:apiKeyId>/<int:AccessPolicyId>/', ApiKeyView.assignAccessPolicy, name='assignAccessPolicy'),
	path('unassignAccessPolicy/<int:apiKeyId>/', ApiKeyView.unassignAccessPolicy, name='unassignAccessPolicy'),

]
