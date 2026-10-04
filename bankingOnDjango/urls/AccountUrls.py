from django.urls import path


from bankingOnDjango.views import AccountView

urlpatterns = [
    path('', AccountView.index, name='index'),

    path('create', AccountView.create, name='create'),
    path('update', AccountView.update, name='update'),
    path('get', AccountView.get, name='get'),
    path('getAll', AccountView.getAll, name='getAll'),
    path('delete', AccountView.delete, name='delete'),


    path('assignBank', AccountView.assignBank, name='assignBank'),
    path('unassignBank', AccountView.unassignBank, name='unassignBank'),



    path('assignBranch', AccountView.assignBranch, name='assignBranch'),
    path('unassignBranch', AccountView.unassignBranch, name='unassignBranch'),



    path('assignProduct', AccountView.assignProduct, name='assignProduct'),
    path('unassignProduct', AccountView.unassignProduct, name='unassignProduct'),




    path('addToOwners', AccountView.addOwners, name='addOwners'),
    path('removeFromOwners', AccountView.removeOwners, name='removeOwners'),



    path('addToTransactions', AccountView.addTransactions, name='addTransactions'),
    path('removeFromTransactions', AccountView.removeTransactions, name='removeTransactions'),



    path('addToStatements', AccountView.addStatements, name='addStatements'),
    path('removeFromStatements', AccountView.removeStatements, name='removeStatements'),



    path('addToStandingInstructions', AccountView.addStandingInstructions, name='addStandingInstructions'),
    path('removeFromStandingInstructions', AccountView.removeStandingInstructions, name='removeStandingInstructions'),



    path('addToFeeCharges', AccountView.addFeeCharges, name='addFeeCharges'),
    path('removeFromFeeCharges', AccountView.removeFeeCharges, name='removeFeeCharges'),


]