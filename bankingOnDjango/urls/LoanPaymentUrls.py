from django.urls import path


from bankingOnDjango.views import LoanPaymentView

urlpatterns = [
    path('', LoanPaymentView.index, name='index'),

    path('create', LoanPaymentView.create, name='create'),
    path('update', LoanPaymentView.update, name='update'),
    path('get', LoanPaymentView.get, name='get'),
    path('getAll', LoanPaymentView.getAll, name='getAll'),
    path('delete', LoanPaymentView.delete, name='delete'),


    path('assignLoanAccount', LoanPaymentView.assignLoanAccount, name='assignLoanAccount'),
    path('unassignLoanAccount', LoanPaymentView.unassignLoanAccount, name='unassignLoanAccount'),



    path('assignTransaction', LoanPaymentView.assignTransaction, name='assignTransaction'),
    path('unassignTransaction', LoanPaymentView.unassignTransaction, name='unassignTransaction'),



]