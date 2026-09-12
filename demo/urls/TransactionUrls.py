from django.urls import path
from demo.views import TransactionView

urlpatterns = [
    path('', TransactionView.index, name='index'),
	path('create', TransactionView.get, name='create'),
	path('get/<int:transactionId>/', TransactionView.get, name='get'),
	path('save', TransactionView.save, name='save'),
	path('getAll', TransactionView.getAll, name='getAll'),
	path('delete/<int:transactionId>/', TransactionView.delete, name='delete'),
	path('assignAccount/<int:transactionId>/<int:AccountId>/', TransactionView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:transactionId>/', TransactionView.unassignAccount, name='unassignAccount'),
	path('assignExternalCounterparty/<int:transactionId>/<int:ExternalCounterpartyId>/', TransactionView.assignExternalCounterparty, name='assignExternalCounterparty'),
	path('unassignExternalCounterparty/<int:transactionId>/', TransactionView.unassignExternalCounterparty, name='unassignExternalCounterparty'),
	path('assignPaymentCard/<int:transactionId>/<int:PaymentCardId>/', TransactionView.assignPaymentCard, name='assignPaymentCard'),
	path('unassignPaymentCard/<int:transactionId>/', TransactionView.unassignPaymentCard, name='unassignPaymentCard'),
	path('assignFundsTransfer/<int:transactionId>/<int:FundsTransferId>/', TransactionView.assignFundsTransfer, name='assignFundsTransfer'),
	path('unassignFundsTransfer/<int:transactionId>/', TransactionView.unassignFundsTransfer, name='unassignFundsTransfer'),
	path('assignFxTrade/<int:transactionId>/<int:FxTradeId>/', TransactionView.assignFxTrade, name='assignFxTrade'),
	path('unassignFxTrade/<int:transactionId>/', TransactionView.unassignFxTrade, name='unassignFxTrade'),
	path('assignDispute/<int:transactionId>/<int:DisputeId>/', TransactionView.assignDispute, name='assignDispute'),
	path('unassignDispute/<int:transactionId>/', TransactionView.unassignDispute, name='unassignDispute'),
]
