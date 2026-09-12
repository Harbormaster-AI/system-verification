from django.urls import path
from demo.views import CustomerView

urlpatterns = [
    path('', CustomerView.index, name='index'),
	path('create', CustomerView.get, name='create'),
	path('get/<int:customerId>/', CustomerView.get, name='get'),
	path('save', CustomerView.save, name='save'),
	path('getAll', CustomerView.getAll, name='getAll'),
	path('delete/<int:customerId>/', CustomerView.delete, name='delete'),
	path('assignBank/<int:customerId>/<int:BankId>/', CustomerView.assignBank, name='assignBank'),
	path('unassignBank/<int:customerId>/', CustomerView.unassignBank, name='unassignBank'),
	path('addAccounts/<int:customerId>/<AccountsIds>/', CustomerView.addAccounts, name='addAccounts'),
	path('removeAccounts/<int:customerId>/<AccountsIds>/', CustomerView.removeAccounts, name='removeAccounts'),
	path('addLoanAccounts/<int:customerId>/<LoanAccountsIds>/', CustomerView.addLoanAccounts, name='addLoanAccounts'),
	path('removeLoanAccounts/<int:customerId>/<LoanAccountsIds>/', CustomerView.removeLoanAccounts, name='removeLoanAccounts'),
	path('addPaymentCards/<int:customerId>/<PaymentCardsIds>/', CustomerView.addPaymentCards, name='addPaymentCards'),
	path('removePaymentCards/<int:customerId>/<PaymentCardsIds>/', CustomerView.removePaymentCards, name='removePaymentCards'),
	path('addExternalAccounts/<int:customerId>/<ExternalAccountsIds>/', CustomerView.addExternalAccounts, name='addExternalAccounts'),
	path('removeExternalAccounts/<int:customerId>/<ExternalAccountsIds>/', CustomerView.removeExternalAccounts, name='removeExternalAccounts'),
	path('addFundsTransfers/<int:customerId>/<FundsTransfersIds>/', CustomerView.addFundsTransfers, name='addFundsTransfers'),
	path('removeFundsTransfers/<int:customerId>/<FundsTransfersIds>/', CustomerView.removeFundsTransfers, name='removeFundsTransfers'),
	path('addDisputes/<int:customerId>/<DisputesIds>/', CustomerView.addDisputes, name='addDisputes'),
	path('removeDisputes/<int:customerId>/<DisputesIds>/', CustomerView.removeDisputes, name='removeDisputes'),
	path('addKycProfiles/<int:customerId>/<KycProfilesIds>/', CustomerView.addKycProfiles, name='addKycProfiles'),
	path('removeKycProfiles/<int:customerId>/<KycProfilesIds>/', CustomerView.removeKycProfiles, name='removeKycProfiles'),
	path('addConsents/<int:customerId>/<ConsentsIds>/', CustomerView.addConsents, name='addConsents'),
	path('removeConsents/<int:customerId>/<ConsentsIds>/', CustomerView.removeConsents, name='removeConsents'),
]
