from django.urls import path
from demo.views import ThirdPartyProviderView

urlpatterns = [
    path('', ThirdPartyProviderView.index, name='index'),
	path('create', ThirdPartyProviderView.get, name='create'),
	path('get/<int:thirdPartyProviderId>/', ThirdPartyProviderView.get, name='get'),
	path('save', ThirdPartyProviderView.save, name='save'),
	path('getAll', ThirdPartyProviderView.getAll, name='getAll'),
	path('delete/<int:thirdPartyProviderId>/', ThirdPartyProviderView.delete, name='delete'),
	path('assignBank/<int:thirdPartyProviderId>/<int:BankId>/', ThirdPartyProviderView.assignBank, name='assignBank'),
	path('unassignBank/<int:thirdPartyProviderId>/', ThirdPartyProviderView.unassignBank, name='unassignBank'),
	path('addConsents/<int:thirdPartyProviderId>/<ConsentsIds>/', ThirdPartyProviderView.addConsents, name='addConsents'),
	path('removeConsents/<int:thirdPartyProviderId>/<ConsentsIds>/', ThirdPartyProviderView.removeConsents, name='removeConsents'),
]
