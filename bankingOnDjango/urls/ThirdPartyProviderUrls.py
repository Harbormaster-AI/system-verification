from django.urls import path


from bankingOnDjango.views import ThirdPartyProviderView

urlpatterns = [
    path('', ThirdPartyProviderView.index, name='index'),

    path('create', ThirdPartyProviderView.create, name='create'),
    path('update', ThirdPartyProviderView.update, name='update'),
    path('get', ThirdPartyProviderView.get, name='get'),
    path('getAll', ThirdPartyProviderView.getAll, name='getAll'),
    path('delete', ThirdPartyProviderView.delete, name='delete'),


    path('assignBank', ThirdPartyProviderView.assignBank, name='assignBank'),
    path('unassignBank', ThirdPartyProviderView.unassignBank, name='unassignBank'),




    path('addToConsents', ThirdPartyProviderView.addConsents, name='addConsents'),
    path('removeFromConsents', ThirdPartyProviderView.removeConsents, name='removeConsents'),


]