from django.urls import path
from demo.views import FundsTransferView

urlpatterns = [
    path('', FundsTransferView.index, name='index'),
	path('create', FundsTransferView.get, name='create'),
	path('get/<int:fundsTransferId>/', FundsTransferView.get, name='get'),
	path('save', FundsTransferView.save, name='save'),
	path('getAll', FundsTransferView.getAll, name='getAll'),
	path('delete/<int:fundsTransferId>/', FundsTransferView.delete, name='delete'),
	path('assignSourceAccount/<int:fundsTransferId>/<int:SourceAccountId>/', FundsTransferView.assignSourceAccount, name='assignSourceAccount'),
	path('unassignSourceAccount/<int:fundsTransferId>/', FundsTransferView.unassignSourceAccount, name='unassignSourceAccount'),
	path('assignDestinationAccount/<int:fundsTransferId>/<int:DestinationAccountId>/', FundsTransferView.assignDestinationAccount, name='assignDestinationAccount'),
	path('unassignDestinationAccount/<int:fundsTransferId>/', FundsTransferView.unassignDestinationAccount, name='unassignDestinationAccount'),
	path('assignExternalBeneficiary/<int:fundsTransferId>/<int:ExternalBeneficiaryId>/', FundsTransferView.assignExternalBeneficiary, name='assignExternalBeneficiary'),
	path('unassignExternalBeneficiary/<int:fundsTransferId>/', FundsTransferView.unassignExternalBeneficiary, name='unassignExternalBeneficiary'),
	path('assignInitiatedBy/<int:fundsTransferId>/<int:InitiatedById>/', FundsTransferView.assignInitiatedBy, name='assignInitiatedBy'),
	path('unassignInitiatedBy/<int:fundsTransferId>/', FundsTransferView.unassignInitiatedBy, name='unassignInitiatedBy'),
	path('addTransactions/<int:fundsTransferId>/<TransactionsIds>/', FundsTransferView.addTransactions, name='addTransactions'),
	path('removeTransactions/<int:fundsTransferId>/<TransactionsIds>/', FundsTransferView.removeTransactions, name='removeTransactions'),
]
