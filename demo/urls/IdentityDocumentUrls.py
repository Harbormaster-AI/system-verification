from django.urls import path
from demo.views import IdentityDocumentView

urlpatterns = [
    path('', IdentityDocumentView.index, name='index'),
	path('create', IdentityDocumentView.get, name='create'),
	path('get/<int:identityDocumentId>/', IdentityDocumentView.get, name='get'),
	path('save', IdentityDocumentView.save, name='save'),
	path('getAll', IdentityDocumentView.getAll, name='getAll'),
	path('delete/<int:identityDocumentId>/', IdentityDocumentView.delete, name='delete'),
	path('assignKycProfile/<int:identityDocumentId>/<int:KycProfileId>/', IdentityDocumentView.assignKycProfile, name='assignKycProfile'),
	path('unassignKycProfile/<int:identityDocumentId>/', IdentityDocumentView.unassignKycProfile, name='unassignKycProfile'),
]
