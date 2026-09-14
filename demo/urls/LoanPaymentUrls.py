from django.urls import path
from demo.views import LoanPaymentView

urlpatterns = [
    path('', LoanPaymentView.index, name='index'),
	path('create', LoanPaymentView.get, name='create'),
	path('get/<int:loanPaymentId>/', LoanPaymentView.get, name='get'),
	path('save', LoanPaymentView.save, name='save'),
	path('getAll', LoanPaymentView.getAll, name='getAll'),
	path('delete/<int:loanPaymentId>/', LoanPaymentView.delete, name='delete'),
	path('assignLoanAccount/<int:loanPaymentId>/<int:LoanAccountId>/', LoanPaymentView.assignLoanAccount, name='assignLoanAccount'),
	path('unassignLoanAccount/<int:loanPaymentId>/', LoanPaymentView.unassignLoanAccount, name='unassignLoanAccount'),
	path('assignTransaction/<int:loanPaymentId>/<int:TransactionId>/', LoanPaymentView.assignTransaction, name='assignTransaction'),
	path('unassignTransaction/<int:loanPaymentId>/', LoanPaymentView.unassignTransaction, name='unassignTransaction'),
]
