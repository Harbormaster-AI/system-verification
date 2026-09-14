from django.urls import path
from demo.views import StandingInstructionView

urlpatterns = [
    path('', StandingInstructionView.index, name='index'),
	path('create', StandingInstructionView.get, name='create'),
	path('get/<int:standingInstructionId>/', StandingInstructionView.get, name='get'),
	path('save', StandingInstructionView.save, name='save'),
	path('getAll', StandingInstructionView.getAll, name='getAll'),
	path('delete/<int:standingInstructionId>/', StandingInstructionView.delete, name='delete'),
	path('assignAccount/<int:standingInstructionId>/<int:AccountId>/', StandingInstructionView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:standingInstructionId>/', StandingInstructionView.unassignAccount, name='unassignAccount'),
	path('assignBeneficiary/<int:standingInstructionId>/<int:BeneficiaryId>/', StandingInstructionView.assignBeneficiary, name='assignBeneficiary'),
	path('unassignBeneficiary/<int:standingInstructionId>/', StandingInstructionView.unassignBeneficiary, name='unassignBeneficiary'),
]
