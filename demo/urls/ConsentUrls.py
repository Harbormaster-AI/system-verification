from django.urls import path
from demo.views import ConsentView

urlpatterns = [
    path('', ConsentView.index, name='index'),
	path('create', ConsentView.get, name='create'),
	path('get/<int:consentId>/', ConsentView.get, name='get'),
	path('save', ConsentView.save, name='save'),
	path('getAll', ConsentView.getAll, name='getAll'),
	path('delete/<int:consentId>/', ConsentView.delete, name='delete'),
	path('assignCustomer/<int:consentId>/<int:CustomerId>/', ConsentView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:consentId>/', ConsentView.unassignCustomer, name='unassignCustomer'),
	path('assignBank/<int:consentId>/<int:BankId>/', ConsentView.assignBank, name='assignBank'),
	path('unassignBank/<int:consentId>/', ConsentView.unassignBank, name='unassignBank'),
	path('assignThirdPartyProvider/<int:consentId>/<int:ThirdPartyProviderId>/', ConsentView.assignThirdPartyProvider, name='assignThirdPartyProvider'),
	path('unassignThirdPartyProvider/<int:consentId>/', ConsentView.unassignThirdPartyProvider, name='unassignThirdPartyProvider'),
	path('addAuthorizedAccounts/<int:consentId>/<AuthorizedAccountsIds>/', ConsentView.addAuthorizedAccounts, name='addAuthorizedAccounts'),
	path('removeAuthorizedAccounts/<int:consentId>/<AuthorizedAccountsIds>/', ConsentView.removeAuthorizedAccounts, name='removeAuthorizedAccounts'),
]
