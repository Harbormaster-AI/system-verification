from django.urls import path
from demo.views import RiskAssessmentView

urlpatterns = [
    path('', RiskAssessmentView.index, name='index'),
	path('create', RiskAssessmentView.get, name='create'),
	path('get/<int:riskAssessmentId>/', RiskAssessmentView.get, name='get'),
	path('save', RiskAssessmentView.save, name='save'),
	path('getAll', RiskAssessmentView.getAll, name='getAll'),
	path('delete/<int:riskAssessmentId>/', RiskAssessmentView.delete, name='delete'),
	path('assignKycProfile/<int:riskAssessmentId>/<int:KycProfileId>/', RiskAssessmentView.assignKycProfile, name='assignKycProfile'),
	path('unassignKycProfile/<int:riskAssessmentId>/', RiskAssessmentView.unassignKycProfile, name='unassignKycProfile'),
]
