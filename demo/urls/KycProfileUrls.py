from django.urls import path
from demo.views import KycProfileView

urlpatterns = [
    path('', KycProfileView.index, name='index'),
	path('create', KycProfileView.get, name='create'),
	path('get/<int:kycProfileId>/', KycProfileView.get, name='get'),
	path('save', KycProfileView.save, name='save'),
	path('getAll', KycProfileView.getAll, name='getAll'),
	path('delete/<int:kycProfileId>/', KycProfileView.delete, name='delete'),
	path('assignCustomer/<int:kycProfileId>/<int:CustomerId>/', KycProfileView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:kycProfileId>/', KycProfileView.unassignCustomer, name='unassignCustomer'),
	path('addIdentityDocuments/<int:kycProfileId>/<IdentityDocumentsIds>/', KycProfileView.addIdentityDocuments, name='addIdentityDocuments'),
	path('removeIdentityDocuments/<int:kycProfileId>/<IdentityDocumentsIds>/', KycProfileView.removeIdentityDocuments, name='removeIdentityDocuments'),
	path('addRiskAssessments/<int:kycProfileId>/<RiskAssessmentsIds>/', KycProfileView.addRiskAssessments, name='addRiskAssessments'),
	path('removeRiskAssessments/<int:kycProfileId>/<RiskAssessmentsIds>/', KycProfileView.removeRiskAssessments, name='removeRiskAssessments'),
	path('addScreenings/<int:kycProfileId>/<ScreeningsIds>/', KycProfileView.addScreenings, name='addScreenings'),
	path('removeScreenings/<int:kycProfileId>/<ScreeningsIds>/', KycProfileView.removeScreenings, name='removeScreenings'),
]
