from django.urls import path
from demo.views import AccountStatementView

urlpatterns = [
    path('', AccountStatementView.index, name='index'),
	path('create', AccountStatementView.get, name='create'),
	path('get/<int:accountStatementId>/', AccountStatementView.get, name='get'),
	path('save', AccountStatementView.save, name='save'),
	path('getAll', AccountStatementView.getAll, name='getAll'),
	path('delete/<int:accountStatementId>/', AccountStatementView.delete, name='delete'),
	path('assignAccount/<int:accountStatementId>/<int:AccountId>/', AccountStatementView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:accountStatementId>/', AccountStatementView.unassignAccount, name='unassignAccount'),
]
