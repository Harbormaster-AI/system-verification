from django.urls import path
from demo.views import AccountView

urlpatterns = [
    path('', AccountView.index, name='index'),
	path('create', AccountView.get, name='create'),
	path('get/<int:accountId>/', AccountView.get, name='get'),
	path('save', AccountView.save, name='save'),
	path('getAll', AccountView.getAll, name='getAll'),
	path('delete/<int:accountId>/', AccountView.delete, name='delete'),
	path('assignBank/<int:accountId>/<int:BankId>/', AccountView.assignBank, name='assignBank'),
	path('unassignBank/<int:accountId>/', AccountView.unassignBank, name='unassignBank'),
	path('assignBranch/<int:accountId>/<int:BranchId>/', AccountView.assignBranch, name='assignBranch'),
	path('unassignBranch/<int:accountId>/', AccountView.unassignBranch, name='unassignBranch'),
	path('assignProduct/<int:accountId>/<int:ProductId>/', AccountView.assignProduct, name='assignProduct'),
	path('unassignProduct/<int:accountId>/', AccountView.unassignProduct, name='unassignProduct'),
	path('addOwners/<int:accountId>/<OwnersIds>/', AccountView.addOwners, name='addOwners'),
	path('removeOwners/<int:accountId>/<OwnersIds>/', AccountView.removeOwners, name='removeOwners'),
	path('addTransactions/<int:accountId>/<TransactionsIds>/', AccountView.addTransactions, name='addTransactions'),
	path('removeTransactions/<int:accountId>/<TransactionsIds>/', AccountView.removeTransactions, name='removeTransactions'),
	path('addStatements/<int:accountId>/<StatementsIds>/', AccountView.addStatements, name='addStatements'),
	path('removeStatements/<int:accountId>/<StatementsIds>/', AccountView.removeStatements, name='removeStatements'),
	path('addStandingInstructions/<int:accountId>/<StandingInstructionsIds>/', AccountView.addStandingInstructions, name='addStandingInstructions'),
	path('removeStandingInstructions/<int:accountId>/<StandingInstructionsIds>/', AccountView.removeStandingInstructions, name='removeStandingInstructions'),
	path('addFeeCharges/<int:accountId>/<FeeChargesIds>/', AccountView.addFeeCharges, name='addFeeCharges'),
	path('removeFeeCharges/<int:accountId>/<FeeChargesIds>/', AccountView.removeFeeCharges, name='removeFeeCharges'),
]
