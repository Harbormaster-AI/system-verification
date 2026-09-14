from django.urls import path
from demo.views import LoanAccountView

urlpatterns = [
    path('', LoanAccountView.index, name='index'),
	path('create', LoanAccountView.get, name='create'),
	path('get/<int:loanAccountId>/', LoanAccountView.get, name='get'),
	path('save', LoanAccountView.save, name='save'),
	path('getAll', LoanAccountView.getAll, name='getAll'),
	path('delete/<int:loanAccountId>/', LoanAccountView.delete, name='delete'),
	path('assignBank/<int:loanAccountId>/<int:BankId>/', LoanAccountView.assignBank, name='assignBank'),
	path('unassignBank/<int:loanAccountId>/', LoanAccountView.unassignBank, name='unassignBank'),
	path('assignBranch/<int:loanAccountId>/<int:BranchId>/', LoanAccountView.assignBranch, name='assignBranch'),
	path('unassignBranch/<int:loanAccountId>/', LoanAccountView.unassignBranch, name='unassignBranch'),
	path('assignProduct/<int:loanAccountId>/<int:ProductId>/', LoanAccountView.assignProduct, name='assignProduct'),
	path('unassignProduct/<int:loanAccountId>/', LoanAccountView.unassignProduct, name='unassignProduct'),
	path('addBorrowers/<int:loanAccountId>/<BorrowersIds>/', LoanAccountView.addBorrowers, name='addBorrowers'),
	path('removeBorrowers/<int:loanAccountId>/<BorrowersIds>/', LoanAccountView.removeBorrowers, name='removeBorrowers'),
	path('addRepaymentSchedule/<int:loanAccountId>/<RepaymentScheduleIds>/', LoanAccountView.addRepaymentSchedule, name='addRepaymentSchedule'),
	path('removeRepaymentSchedule/<int:loanAccountId>/<RepaymentScheduleIds>/', LoanAccountView.removeRepaymentSchedule, name='removeRepaymentSchedule'),
	path('addPayments/<int:loanAccountId>/<PaymentsIds>/', LoanAccountView.addPayments, name='addPayments'),
	path('removePayments/<int:loanAccountId>/<PaymentsIds>/', LoanAccountView.removePayments, name='removePayments'),
	path('addCollateral/<int:loanAccountId>/<CollateralIds>/', LoanAccountView.addCollateral, name='addCollateral'),
	path('removeCollateral/<int:loanAccountId>/<CollateralIds>/', LoanAccountView.removeCollateral, name='removeCollateral'),
	path('addFeeCharges/<int:loanAccountId>/<FeeChargesIds>/', LoanAccountView.addFeeCharges, name='addFeeCharges'),
	path('removeFeeCharges/<int:loanAccountId>/<FeeChargesIds>/', LoanAccountView.removeFeeCharges, name='removeFeeCharges'),
]
