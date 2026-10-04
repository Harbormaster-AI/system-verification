from django.urls import path


from bankingOnDjango.views import FundsTransferView

urlpatterns = [
    path('', FundsTransferView.index, name='index'),

    path('create', FundsTransferView.create, name='create'),
    path('update', FundsTransferView.update, name='update'),
    path('get', FundsTransferView.get, name='get'),
    path('getAll', FundsTransferView.getAll, name='getAll'),
    path('delete', FundsTransferView.delete, name='delete'),


    path('assignSourceAccount', FundsTransferView.assignSourceAccount, name='assignSourceAccount'),
    path('unassignSourceAccount', FundsTransferView.unassignSourceAccount, name='unassignSourceAccount'),



    path('assignDestinationAccount', FundsTransferView.assignDestinationAccount, name='assignDestinationAccount'),
    path('unassignDestinationAccount', FundsTransferView.unassignDestinationAccount, name='unassignDestinationAccount'),



    path('assignExternalBeneficiary', FundsTransferView.assignExternalBeneficiary, name='assignExternalBeneficiary'),
    path('unassignExternalBeneficiary', FundsTransferView.unassignExternalBeneficiary, name='unassignExternalBeneficiary'),



    path('assignInitiatedBy', FundsTransferView.assignInitiatedBy, name='assignInitiatedBy'),
    path('unassignInitiatedBy', FundsTransferView.unassignInitiatedBy, name='unassignInitiatedBy'),




    path('addToTransactions', FundsTransferView.addTransactions, name='addTransactions'),
    path('removeFromTransactions', FundsTransferView.removeTransactions, name='removeTransactions'),


]