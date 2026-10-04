from django.urls import path


from bankingOnDjango.views import CustomerView

urlpatterns = [
    path('', CustomerView.index, name='index'),

    path('create', CustomerView.create, name='create'),
    path('update', CustomerView.update, name='update'),
    path('get', CustomerView.get, name='get'),
    path('getAll', CustomerView.getAll, name='getAll'),
    path('delete', CustomerView.delete, name='delete'),


    path('assignBank', CustomerView.assignBank, name='assignBank'),
    path('unassignBank', CustomerView.unassignBank, name='unassignBank'),




    path('addToAccounts', CustomerView.addAccounts, name='addAccounts'),
    path('removeFromAccounts', CustomerView.removeAccounts, name='removeAccounts'),



    path('addToLoanAccounts', CustomerView.addLoanAccounts, name='addLoanAccounts'),
    path('removeFromLoanAccounts', CustomerView.removeLoanAccounts, name='removeLoanAccounts'),



    path('addToPaymentCards', CustomerView.addPaymentCards, name='addPaymentCards'),
    path('removeFromPaymentCards', CustomerView.removePaymentCards, name='removePaymentCards'),



    path('addToExternalAccounts', CustomerView.addExternalAccounts, name='addExternalAccounts'),
    path('removeFromExternalAccounts', CustomerView.removeExternalAccounts, name='removeExternalAccounts'),



    path('addToFundsTransfers', CustomerView.addFundsTransfers, name='addFundsTransfers'),
    path('removeFromFundsTransfers', CustomerView.removeFundsTransfers, name='removeFundsTransfers'),



    path('addToDisputes', CustomerView.addDisputes, name='addDisputes'),
    path('removeFromDisputes', CustomerView.removeDisputes, name='removeDisputes'),



    path('addToKycProfiles', CustomerView.addKycProfiles, name='addKycProfiles'),
    path('removeFromKycProfiles', CustomerView.removeKycProfiles, name='removeKycProfiles'),



    path('addToConsents', CustomerView.addConsents, name='addConsents'),
    path('removeFromConsents', CustomerView.removeConsents, name='removeConsents'),


]