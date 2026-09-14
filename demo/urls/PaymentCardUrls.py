from django.urls import path
from demo.views import PaymentCardView

urlpatterns = [
    path('', PaymentCardView.index, name='index'),
	path('create', PaymentCardView.get, name='create'),
	path('get/<int:paymentCardId>/', PaymentCardView.get, name='get'),
	path('save', PaymentCardView.save, name='save'),
	path('getAll', PaymentCardView.getAll, name='getAll'),
	path('delete/<int:paymentCardId>/', PaymentCardView.delete, name='delete'),
	path('assignBank/<int:paymentCardId>/<int:BankId>/', PaymentCardView.assignBank, name='assignBank'),
	path('unassignBank/<int:paymentCardId>/', PaymentCardView.unassignBank, name='unassignBank'),
	path('assignAccount/<int:paymentCardId>/<int:AccountId>/', PaymentCardView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:paymentCardId>/', PaymentCardView.unassignAccount, name='unassignAccount'),
	path('assignCustomer/<int:paymentCardId>/<int:CustomerId>/', PaymentCardView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:paymentCardId>/', PaymentCardView.unassignCustomer, name='unassignCustomer'),
	path('addTransactions/<int:paymentCardId>/<TransactionsIds>/', PaymentCardView.addTransactions, name='addTransactions'),
	path('removeTransactions/<int:paymentCardId>/<TransactionsIds>/', PaymentCardView.removeTransactions, name='removeTransactions'),
]
