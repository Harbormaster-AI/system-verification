from django.urls import path


from bankingOnDjango.views import PaymentCardView

urlpatterns = [
    path('', PaymentCardView.index, name='index'),

    path('create', PaymentCardView.create, name='create'),
    path('update', PaymentCardView.update, name='update'),
    path('get', PaymentCardView.get, name='get'),
    path('getAll', PaymentCardView.getAll, name='getAll'),
    path('delete', PaymentCardView.delete, name='delete'),


    path('assignBank', PaymentCardView.assignBank, name='assignBank'),
    path('unassignBank', PaymentCardView.unassignBank, name='unassignBank'),



    path('assignAccount', PaymentCardView.assignAccount, name='assignAccount'),
    path('unassignAccount', PaymentCardView.unassignAccount, name='unassignAccount'),



    path('assignCustomer', PaymentCardView.assignCustomer, name='assignCustomer'),
    path('unassignCustomer', PaymentCardView.unassignCustomer, name='unassignCustomer'),




    path('addToTransactions', PaymentCardView.addTransactions, name='addTransactions'),
    path('removeFromTransactions', PaymentCardView.removeTransactions, name='removeTransactions'),


]