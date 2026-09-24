from django.urls import path


from bankingOnDjango.views import BankingProductView

urlpatterns = [
    path('', BankingProductView.index, name='index'),

    path('create', BankingProductView.create, name='create'),
    path('update', BankingProductView.update, name='update'),
    path('get', BankingProductView.get, name='get'),
    path('getAll', BankingProductView.getAll, name='getAll'),
    path('delete', BankingProductView.delete, name='delete'),


    path('assignBank', BankingProductView.assignBank, name='assignBank'),
    path('unassignBank', BankingProductView.unassignBank, name='unassignBank'),




    path('addToAccounts', BankingProductView.addAccounts, name='addAccounts'),
    path('removeFromAccounts', BankingProductView.removeAccounts, name='removeAccounts'),



    path('addToLoanAccounts', BankingProductView.addLoanAccounts, name='addLoanAccounts'),
    path('removeFromLoanAccounts', BankingProductView.removeLoanAccounts, name='removeLoanAccounts'),



    path('addToPaymentCards', BankingProductView.addPaymentCards, name='addPaymentCards'),
    path('removeFromPaymentCards', BankingProductView.removePaymentCards, name='removePaymentCards'),


]