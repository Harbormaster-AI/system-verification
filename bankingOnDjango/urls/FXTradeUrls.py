from django.urls import path


from bankingOnDjango.views import FXTradeView

urlpatterns = [
    path('', FXTradeView.index, name='index'),

    path('create', FXTradeView.create, name='create'),
    path('update', FXTradeView.update, name='update'),
    path('get', FXTradeView.get, name='get'),
    path('getAll', FXTradeView.getAll, name='getAll'),
    path('delete', FXTradeView.delete, name='delete'),


    path('assignCustomer', FXTradeView.assignCustomer, name='assignCustomer'),
    path('unassignCustomer', FXTradeView.unassignCustomer, name='unassignCustomer'),



    path('assignBank', FXTradeView.assignBank, name='assignBank'),
    path('unassignBank', FXTradeView.unassignBank, name='unassignBank'),



    path('assignExchangeRate', FXTradeView.assignExchangeRate, name='assignExchangeRate'),
    path('unassignExchangeRate', FXTradeView.unassignExchangeRate, name='unassignExchangeRate'),



    path('assignSourceAccount', FXTradeView.assignSourceAccount, name='assignSourceAccount'),
    path('unassignSourceAccount', FXTradeView.unassignSourceAccount, name='unassignSourceAccount'),



    path('assignDestinationAccount', FXTradeView.assignDestinationAccount, name='assignDestinationAccount'),
    path('unassignDestinationAccount', FXTradeView.unassignDestinationAccount, name='unassignDestinationAccount'),



    path('assignTransaction', FXTradeView.assignTransaction, name='assignTransaction'),
    path('unassignTransaction', FXTradeView.unassignTransaction, name='unassignTransaction'),



]