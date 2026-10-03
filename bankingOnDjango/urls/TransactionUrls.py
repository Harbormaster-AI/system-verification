from django.urls import path


from bankingOnDjango.views import TransactionView

urlpatterns = [
    path('', TransactionView.index, name='index'),

    path('create', TransactionView.create, name='create'),
    path('update', TransactionView.update, name='update'),
    path('get', TransactionView.get, name='get'),
    path('getAll', TransactionView.getAll, name='getAll'),
    path('delete', TransactionView.delete, name='delete'),


    path('assignAccount', TransactionView.assignAccount, name='assignAccount'),
    path('unassignAccount', TransactionView.unassignAccount, name='unassignAccount'),



    path('assignExternalCounterparty', TransactionView.assignExternalCounterparty, name='assignExternalCounterparty'),
    path('unassignExternalCounterparty', TransactionView.unassignExternalCounterparty, name='unassignExternalCounterparty'),



    path('assignPaymentCard', TransactionView.assignPaymentCard, name='assignPaymentCard'),
    path('unassignPaymentCard', TransactionView.unassignPaymentCard, name='unassignPaymentCard'),



    path('assignFundsTransfer', TransactionView.assignFundsTransfer, name='assignFundsTransfer'),
    path('unassignFundsTransfer', TransactionView.unassignFundsTransfer, name='unassignFundsTransfer'),



    path('assignFxTrade', TransactionView.assignFxTrade, name='assignFxTrade'),
    path('unassignFxTrade', TransactionView.unassignFxTrade, name='unassignFxTrade'),



    path('assignDispute', TransactionView.assignDispute, name='assignDispute'),
    path('unassignDispute', TransactionView.unassignDispute, name='unassignDispute'),



]