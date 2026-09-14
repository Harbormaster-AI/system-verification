from django.urls import path
from demo.views import DisputeView

urlpatterns = [
    path('', DisputeView.index, name='index'),
	path('create', DisputeView.get, name='create'),
	path('get/<int:disputeId>/', DisputeView.get, name='get'),
	path('save', DisputeView.save, name='save'),
	path('getAll', DisputeView.getAll, name='getAll'),
	path('delete/<int:disputeId>/', DisputeView.delete, name='delete'),
	path('assignTransaction/<int:disputeId>/<int:TransactionId>/', DisputeView.assignTransaction, name='assignTransaction'),
	path('unassignTransaction/<int:disputeId>/', DisputeView.unassignTransaction, name='unassignTransaction'),
	path('assignCustomer/<int:disputeId>/<int:CustomerId>/', DisputeView.assignCustomer, name='assignCustomer'),
	path('unassignCustomer/<int:disputeId>/', DisputeView.unassignCustomer, name='unassignCustomer'),
	path('assignAccount/<int:disputeId>/<int:AccountId>/', DisputeView.assignAccount, name='assignAccount'),
	path('unassignAccount/<int:disputeId>/', DisputeView.unassignAccount, name='unassignAccount'),
	path('assignPaymentCard/<int:disputeId>/<int:PaymentCardId>/', DisputeView.assignPaymentCard, name='assignPaymentCard'),
	path('unassignPaymentCard/<int:disputeId>/', DisputeView.unassignPaymentCard, name='unassignPaymentCard'),
]
