from django.urls import path


from bankingOnDjango.views import BankView

urlpatterns = [
    path('', BankView.index, name='index'),

    path('create', BankView.create, name='create'),
    path('update', BankView.update, name='update'),
    path('get', BankView.get, name='get'),
    path('getAll', BankView.getAll, name='getAll'),
    path('delete', BankView.delete, name='delete'),



    path('addToBranches', BankView.addBranches, name='addBranches'),
    path('removeFromBranches', BankView.removeBranches, name='removeBranches'),



    path('addToProducts', BankView.addProducts, name='addProducts'),
    path('removeFromProducts', BankView.removeProducts, name='removeProducts'),



    path('addToCustomers', BankView.addCustomers, name='addCustomers'),
    path('removeFromCustomers', BankView.removeCustomers, name='removeCustomers'),



    path('addToAccounts', BankView.addAccounts, name='addAccounts'),
    path('removeFromAccounts', BankView.removeAccounts, name='removeAccounts'),



    path('addToPaymentCards', BankView.addPaymentCards, name='addPaymentCards'),
    path('removeFromPaymentCards', BankView.removePaymentCards, name='removePaymentCards'),



    path('addToLoanAccounts', BankView.addLoanAccounts, name='addLoanAccounts'),
    path('removeFromLoanAccounts', BankView.removeLoanAccounts, name='removeLoanAccounts'),



    path('addToExchangeRates', BankView.addExchangeRates, name='addExchangeRates'),
    path('removeFromExchangeRates', BankView.removeExchangeRates, name='removeExchangeRates'),



    path('addToConsents', BankView.addConsents, name='addConsents'),
    path('removeFromConsents', BankView.removeConsents, name='removeConsents'),



    path('addToThirdPartyProviders', BankView.addThirdPartyProviders, name='addThirdPartyProviders'),
    path('removeFromThirdPartyProviders', BankView.removeThirdPartyProviders, name='removeThirdPartyProviders'),


]