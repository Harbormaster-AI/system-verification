from django.urls import path
from demo.views import BankView

urlpatterns = [
    path('', BankView.index, name='index'),
	path('create', BankView.get, name='create'),
	path('get/<int:bankId>/', BankView.get, name='get'),
	path('save', BankView.save, name='save'),
	path('getAll', BankView.getAll, name='getAll'),
	path('delete/<int:bankId>/', BankView.delete, name='delete'),
	path('addBranches/<int:bankId>/<BranchesIds>/', BankView.addBranches, name='addBranches'),
	path('removeBranches/<int:bankId>/<BranchesIds>/', BankView.removeBranches, name='removeBranches'),
	path('addProducts/<int:bankId>/<ProductsIds>/', BankView.addProducts, name='addProducts'),
	path('removeProducts/<int:bankId>/<ProductsIds>/', BankView.removeProducts, name='removeProducts'),
	path('addCustomers/<int:bankId>/<CustomersIds>/', BankView.addCustomers, name='addCustomers'),
	path('removeCustomers/<int:bankId>/<CustomersIds>/', BankView.removeCustomers, name='removeCustomers'),
	path('addAccounts/<int:bankId>/<AccountsIds>/', BankView.addAccounts, name='addAccounts'),
	path('removeAccounts/<int:bankId>/<AccountsIds>/', BankView.removeAccounts, name='removeAccounts'),
	path('addPaymentCards/<int:bankId>/<PaymentCardsIds>/', BankView.addPaymentCards, name='addPaymentCards'),
	path('removePaymentCards/<int:bankId>/<PaymentCardsIds>/', BankView.removePaymentCards, name='removePaymentCards'),
	path('addLoanAccounts/<int:bankId>/<LoanAccountsIds>/', BankView.addLoanAccounts, name='addLoanAccounts'),
	path('removeLoanAccounts/<int:bankId>/<LoanAccountsIds>/', BankView.removeLoanAccounts, name='removeLoanAccounts'),
	path('addExchangeRates/<int:bankId>/<ExchangeRatesIds>/', BankView.addExchangeRates, name='addExchangeRates'),
	path('removeExchangeRates/<int:bankId>/<ExchangeRatesIds>/', BankView.removeExchangeRates, name='removeExchangeRates'),
	path('addConsents/<int:bankId>/<ConsentsIds>/', BankView.addConsents, name='addConsents'),
	path('removeConsents/<int:bankId>/<ConsentsIds>/', BankView.removeConsents, name='removeConsents'),
	path('addThirdPartyProviders/<int:bankId>/<ThirdPartyProvidersIds>/', BankView.addThirdPartyProviders, name='addThirdPartyProviders'),
	path('removeThirdPartyProviders/<int:bankId>/<ThirdPartyProvidersIds>/', BankView.removeThirdPartyProviders, name='removeThirdPartyProviders'),
]
