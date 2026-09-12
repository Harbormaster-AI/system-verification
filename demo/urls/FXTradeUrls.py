from django.urls import path
from demo.views import FXTradeView

urlpatterns = [
    path('', FXTradeView.index, name='index'),
	path('create', FXTradeView.get, name='create'),
	path('get/<int:fXTradeId>/', FXTradeView.get, name='get'),
	path('save', FXTradeView.save, name='save'),
	path('getAll', FXTradeView.getAll, name='getAll'),
	path('delete/<int:fXTradeId>/', FXTradeView.delete, name='delete'),
	path('assignCustomer/<int:fXTradeId>/<int:CustomerId>/', FXTradeView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:fXTradeId>/', FXTradeView.unassignCustomer, name='unassignCustomer'),
	path('assignBank/<int:fXTradeId>/<int:BankId>/', FXTradeView.assignBank, name='assignBank'),
	path('unassignBank/<int:fXTradeId>/', FXTradeView.unassignBank, name='unassignBank'),
	path('assignExchangeRate/<int:fXTradeId>/<int:ExchangeRateId>/', FXTradeView.assignExchangeRate, name='assignExchangeRate'),
	path('unassignExchangeRate/<int:fXTradeId>/', FXTradeView.unassignExchangeRate, name='unassignExchangeRate'),
	path('assignSourceAccount/<int:fXTradeId>/<int:SourceAccountId>/', FXTradeView.assignSourceAccount, name='assignSourceAccount'),
	path('unassignSourceAccount/<int:fXTradeId>/', FXTradeView.unassignSourceAccount, name='unassignSourceAccount'),
	path('assignDestinationAccount/<int:fXTradeId>/<int:DestinationAccountId>/', FXTradeView.assignDestinationAccount, name='assignDestinationAccount'),
	path('unassignDestinationAccount/<int:fXTradeId>/', FXTradeView.unassignDestinationAccount, name='unassignDestinationAccount'),
	path('assignTransaction/<int:fXTradeId>/<int:TransactionId>/', FXTradeView.assignTransaction, name='assignTransaction'),
	path('unassignTransaction/<int:fXTradeId>/', FXTradeView.unassignTransaction, name='unassignTransaction'),
]
