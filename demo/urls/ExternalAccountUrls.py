from django.urls import path
from demo.views import ExternalAccountView

urlpatterns = [
    path('', ExternalAccountView.index, name='index'),
	path('create', ExternalAccountView.get, name='create'),
	path('get/<int:externalAccountId>/', ExternalAccountView.get, name='get'),
	path('save', ExternalAccountView.save, name='save'),
	path('getAll', ExternalAccountView.getAll, name='getAll'),
	path('delete/<int:externalAccountId>/', ExternalAccountView.delete, name='delete'),
	path('assignCustomer/<int:externalAccountId>/<int:CustomerId>/', ExternalAccountView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:externalAccountId>/', ExternalAccountView.unassignCustomer, name='unassignCustomer'),
	path('addTransactions/<int:externalAccountId>/<TransactionsIds>/', ExternalAccountView.addTransactions, name='addTransactions'),
	path('removeTransactions/<int:externalAccountId>/<TransactionsIds>/', ExternalAccountView.removeTransactions, name='removeTransactions'),
]
