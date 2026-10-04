from django.urls import path


from bankingOnDjango.views import IdentityDocumentView

urlpatterns = [
    path('', IdentityDocumentView.index, name='index'),

    path('create', IdentityDocumentView.create, name='create'),
    path('update', IdentityDocumentView.update, name='update'),
    path('get', IdentityDocumentView.get, name='get'),
    path('getAll', IdentityDocumentView.getAll, name='getAll'),
    path('delete', IdentityDocumentView.delete, name='delete'),


    path('assignKycProfile', IdentityDocumentView.assignKycProfile, name='assignKycProfile'),
    path('unassignKycProfile', IdentityDocumentView.unassignKycProfile, name='unassignKycProfile'),



]