from django.urls import path


from bankingOnDjango.views import KycProfileView

urlpatterns = [
    path('', KycProfileView.index, name='index'),

    path('create', KycProfileView.create, name='create'),
    path('update', KycProfileView.update, name='update'),
    path('get', KycProfileView.get, name='get'),
    path('getAll', KycProfileView.getAll, name='getAll'),
    path('delete', KycProfileView.delete, name='delete'),


    path('assignCustomer', KycProfileView.assignCustomer, name='assignCustomer'),
    path('unassignCustomer', KycProfileView.unassignCustomer, name='unassignCustomer'),




    path('addToIdentityDocuments', KycProfileView.addIdentityDocuments, name='addIdentityDocuments'),
    path('removeFromIdentityDocuments', KycProfileView.removeIdentityDocuments, name='removeIdentityDocuments'),



    path('addToRiskAssessments', KycProfileView.addRiskAssessments, name='addRiskAssessments'),
    path('removeFromRiskAssessments', KycProfileView.removeRiskAssessments, name='removeRiskAssessments'),



    path('addToScreenings', KycProfileView.addScreenings, name='addScreenings'),
    path('removeFromScreenings', KycProfileView.removeScreenings, name='removeScreenings'),


]