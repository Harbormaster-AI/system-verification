from django.urls import path
from demo.views import BranchView

urlpatterns = [
    path('', BranchView.index, name='index'),
	path('create', BranchView.get, name='create'),
	path('get/<int:branchId>/', BranchView.get, name='get'),
	path('save', BranchView.save, name='save'),
	path('getAll', BranchView.getAll, name='getAll'),
	path('delete/<int:branchId>/', BranchView.delete, name='delete'),
	path('assignBank/<int:branchId>/<int:BankId>/', BranchView.assignBank, name='assignBank'),
	path('unassignBank/<int:branchId>/', BranchView.unassignBank, name='unassignBank'),
	path('addAccounts/<int:branchId>/<AccountsIds>/', BranchView.addAccounts, name='addAccounts'),
	path('removeAccounts/<int:branchId>/<AccountsIds>/', BranchView.removeAccounts, name='removeAccounts'),
	path('addLoanAccounts/<int:branchId>/<LoanAccountsIds>/', BranchView.addLoanAccounts, name='addLoanAccounts'),
	path('removeLoanAccounts/<int:branchId>/<LoanAccountsIds>/', BranchView.removeLoanAccounts, name='removeLoanAccounts'),
	path('addAtms/<int:branchId>/<AtmsIds>/', BranchView.addAtms, name='addAtms'),
	path('removeAtms/<int:branchId>/<AtmsIds>/', BranchView.removeAtms, name='removeAtms'),
]
