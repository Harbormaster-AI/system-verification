from django.urls import path


from bankingOnDjango.views import LoanAccountView

urlpatterns = [
    path('', LoanAccountView.index, name='index'),

    path('create', LoanAccountView.create, name='create'),
    path('update', LoanAccountView.update, name='update'),
    path('get', LoanAccountView.get, name='get'),
    path('getAll', LoanAccountView.getAll, name='getAll'),
    path('delete', LoanAccountView.delete, name='delete'),


    path('assignBank', LoanAccountView.assignBank, name='assignBank'),
    path('unassignBank', LoanAccountView.unassignBank, name='unassignBank'),



    path('assignBranch', LoanAccountView.assignBranch, name='assignBranch'),
    path('unassignBranch', LoanAccountView.unassignBranch, name='unassignBranch'),



    path('assignProduct', LoanAccountView.assignProduct, name='assignProduct'),
    path('unassignProduct', LoanAccountView.unassignProduct, name='unassignProduct'),




    path('addToBorrowers', LoanAccountView.addBorrowers, name='addBorrowers'),
    path('removeFromBorrowers', LoanAccountView.removeBorrowers, name='removeBorrowers'),



    path('addToRepaymentSchedule', LoanAccountView.addRepaymentSchedule, name='addRepaymentSchedule'),
    path('removeFromRepaymentSchedule', LoanAccountView.removeRepaymentSchedule, name='removeRepaymentSchedule'),



    path('addToPayments', LoanAccountView.addPayments, name='addPayments'),
    path('removeFromPayments', LoanAccountView.removePayments, name='removePayments'),



    path('addToCollateral', LoanAccountView.addCollateral, name='addCollateral'),
    path('removeFromCollateral', LoanAccountView.removeCollateral, name='removeCollateral'),



    path('addToFeeCharges', LoanAccountView.addFeeCharges, name='addFeeCharges'),
    path('removeFromFeeCharges', LoanAccountView.removeFeeCharges, name='removeFeeCharges'),


]