from django.urls import path
from demo.views import ATMView

urlpatterns = [
    path('', ATMView.index, name='index'),
	path('create', ATMView.get, name='create'),
	path('get/<int:aTMId>/', ATMView.get, name='get'),
	path('save', ATMView.save, name='save'),
	path('getAll', ATMView.getAll, name='getAll'),
	path('delete/<int:aTMId>/', ATMView.delete, name='delete'),
	path('assignBranch/<int:aTMId>/<int:BranchId>/', ATMView.assignBranch, name='assignBranch'),
	path('unassignBranch/<int:aTMId>/', ATMView.unassignBranch, name='unassignBranch'),
]
