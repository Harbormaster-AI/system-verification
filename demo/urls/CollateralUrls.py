from django.urls import path
from demo.views import CollateralView

urlpatterns = [
    path('', CollateralView.index, name='index'),
	path('create', CollateralView.get, name='create'),
	path('get/<int:collateralId>/', CollateralView.get, name='get'),
	path('save', CollateralView.save, name='save'),
	path('getAll', CollateralView.getAll, name='getAll'),
	path('delete/<int:collateralId>/', CollateralView.delete, name='delete'),
	path('assignLoanAccount/<int:collateralId>/<int:LoanAccountId>/', CollateralView.assignLoanAccount, name='assignLoanAccount'),
	path('unassignLoanAccount/<int:collateralId>/', CollateralView.unassignLoanAccount, name='unassignLoanAccount'),
]
