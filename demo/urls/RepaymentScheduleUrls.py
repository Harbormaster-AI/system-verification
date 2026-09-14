from django.urls import path
from demo.views import RepaymentScheduleView

urlpatterns = [
    path('', RepaymentScheduleView.index, name='index'),
	path('create', RepaymentScheduleView.get, name='create'),
	path('get/<int:repaymentScheduleId>/', RepaymentScheduleView.get, name='get'),
	path('save', RepaymentScheduleView.save, name='save'),
	path('getAll', RepaymentScheduleView.getAll, name='getAll'),
	path('delete/<int:repaymentScheduleId>/', RepaymentScheduleView.delete, name='delete'),
	path('assignLoanAccount/<int:repaymentScheduleId>/<int:LoanAccountId>/', RepaymentScheduleView.assignLoanAccount, name='assignLoanAccount'),
	path('unassignLoanAccount/<int:repaymentScheduleId>/', RepaymentScheduleView.unassignLoanAccount, name='unassignLoanAccount'),
	path('assignPayment/<int:repaymentScheduleId>/<int:PaymentId>/', RepaymentScheduleView.assignPayment, name='assignPayment'),
	path('unassignPayment/<int:repaymentScheduleId>/', RepaymentScheduleView.unassignPayment, name='unassignPayment'),
]
