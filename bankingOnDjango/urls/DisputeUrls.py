from django.urls import path


from bankingOnDjango.views import DisputeView

urlpatterns = [
    path('', DisputeView.index, name='index'),

    path('create', DisputeView.create, name='create'),
    path('update', DisputeView.update, name='update'),
    path('get', DisputeView.get, name='get'),
    path('getAll', DisputeView.getAll, name='getAll'),
    path('delete', DisputeView.delete, name='delete'),


    path('assignTransaction', DisputeView.assignTransaction, name='assignTransaction'),
    path('unassignTransaction', DisputeView.unassignTransaction, name='unassignTransaction'),



    path('assignCustomer', DisputeView.assignCustomer, name='assignCustomer'),
    path('unassignCustomer', DisputeView.unassignCustomer, name='unassignCustomer'),



    path('assignAccount', DisputeView.assignAccount, name='assignAccount'),
    path('unassignAccount', DisputeView.unassignAccount, name='unassignAccount'),



    path('assignPaymentCard', DisputeView.assignPaymentCard, name='assignPaymentCard'),
    path('unassignPaymentCard', DisputeView.unassignPaymentCard, name='unassignPaymentCard'),



]