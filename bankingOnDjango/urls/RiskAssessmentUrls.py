from django.urls import path


from bankingOnDjango.views import RiskAssessmentView

urlpatterns = [
    path('', RiskAssessmentView.index, name='index'),

    path('create', RiskAssessmentView.create, name='create'),
    path('update', RiskAssessmentView.update, name='update'),
    path('get', RiskAssessmentView.get, name='get'),
    path('getAll', RiskAssessmentView.getAll, name='getAll'),
    path('delete', RiskAssessmentView.delete, name='delete'),


    path('assignKycProfile', RiskAssessmentView.assignKycProfile, name='assignKycProfile'),
    path('unassignKycProfile', RiskAssessmentView.unassignKycProfile, name='unassignKycProfile'),



]