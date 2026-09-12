from django.urls import path
from demo.views import FeeChargeView

urlpatterns = [
    path('', FeeChargeView.index, name='index'),
	path('create', FeeChargeView.get, name='create'),
	path('get/<int:feeChargeId>/', FeeChargeView.get, name='get'),
	path('save', FeeChargeView.save, name='save'),
	path('getAll', FeeChargeView.getAll, name='getAll'),
	path('delete/<int:feeChargeId>/', FeeChargeView.delete, name='delete'),
	path('assignAccount/<int:feeChargeId>/<int:AccountId>/', FeeChargeView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:feeChargeId>/', FeeChargeView.unassignAccount, name='unassignAccount'),
	path('assignLoanAccount/<int:feeChargeId>/<int:LoanAccountId>/', FeeChargeView.assignLoanAccount, name='assignLoanAccount'),
	path('unassignLoanAccount/<int:feeChargeId>/', FeeChargeView.unassignLoanAccount, name='unassignLoanAccount'),
]
