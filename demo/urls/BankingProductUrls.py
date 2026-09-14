from django.urls import path
from demo.views import BankingProductView

urlpatterns = [
    path('', BankingProductView.index, name='index'),
	path('create', BankingProductView.get, name='create'),
	path('get/<int:bankingProductId>/', BankingProductView.get, name='get'),
	path('save', BankingProductView.save, name='save'),
	path('getAll', BankingProductView.getAll, name='getAll'),
	path('delete/<int:bankingProductId>/', BankingProductView.delete, name='delete'),
	path('assignBank/<int:bankingProductId>/<int:BankId>/', BankingProductView.assignBank, name='assignBank'),
	path('unassignBank/<int:bankingProductId>/', BankingProductView.unassignBank, name='unassignBank'),
	path('addAccounts/<int:bankingProductId>/<AccountsIds>/', BankingProductView.addAccounts, name='addAccounts'),
	path('removeAccounts/<int:bankingProductId>/<AccountsIds>/', BankingProductView.removeAccounts, name='removeAccounts'),
	path('addLoanAccounts/<int:bankingProductId>/<LoanAccountsIds>/', BankingProductView.addLoanAccounts, name='addLoanAccounts'),
	path('removeLoanAccounts/<int:bankingProductId>/<LoanAccountsIds>/', BankingProductView.removeLoanAccounts, name='removeLoanAccounts'),
	path('addPaymentCards/<int:bankingProductId>/<PaymentCardsIds>/', BankingProductView.addPaymentCards, name='addPaymentCards'),
	path('removePaymentCards/<int:bankingProductId>/<PaymentCardsIds>/', BankingProductView.removePaymentCards, name='removePaymentCards'),
]
