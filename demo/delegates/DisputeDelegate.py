from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Dispute import Dispute
from demo.models.Transaction import Transaction
from demo.models.Customer import Customer
from demo.models.Account import Account
from demo.models.PaymentCard import PaymentCard
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Dispute
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class DisputeDelegate Declaration
#======================================================================
class DisputeDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, disputeId ):
		try:	
			dispute = Dispute.objects.filter(id=disputeId)
			return dispute.first();
		except Dispute.DoesNotExist:
			raise ProcessingError("Dispute with id " + str(disputeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, dispute):
		for model in serializers.deserialize("json", dispute):
			model.save()
			return model;

	def create(self, dispute):
		dispute.save()
		return dispute;

	def saveFromJson(self, dispute):
		for model in serializers.deserialize("json", dispute):
			model.save()
			return dispute;
	
	def save(self, dispute):
		dispute.save()
		return dispute;
	
	def delete(self, disputeId ):
		errMsg = "Failed to delete Dispute from db using id " + str(disputeId)
		
		try:
			dispute = Dispute.objects.get(id=disputeId)
			dispute.delete()
			return True
		except Dispute.DoesNotExist:
			raise ProcessingError("Dispute with id " + str(disputeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Dispute.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Dispute from db")
		except Exception:
			return None;
		
	def assignTransaction( self, disputeId, transactionId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to assign element " + str(transactionId) + " for Transaction on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# get the Transaction from db
			transaction = TransactionDelegate().get(transactionId).first();
			
			# assign the Transaction		
			dispute.transaction = transaction
			
			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTransaction( self, disputeId ):
		errMsg = "Failed to unassign element " + str(transactionId) + " for Transaction on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# assign to None for unassignment
			dispute.transaction = None			

			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignCustomer( self, disputeId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			dispute.customer = customer
			
			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, disputeId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# assign to None for unassignment
			dispute.customer = None			

			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignAccount( self, disputeId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			dispute.account = account
			
			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, disputeId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# assign to None for unassignment
			dispute.account = None			

			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignPaymentCard( self, disputeId, paymentCardId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to assign element " + str(paymentCardId) + " for PaymentCard on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# get the PaymentCard from db
			paymentCard = PaymentCardDelegate().get(paymentCardId).first();
			
			# assign the PaymentCard		
			dispute.paymentCard = paymentCard
			
			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignPaymentCard( self, disputeId ):
		errMsg = "Failed to unassign element " + str(paymentCardId) + " for PaymentCard on Dispute"

		try:
			# get the Dispute from db
			dispute = self.get( disputeId ).first()	
			
			# assign to None for unassignment
			dispute.paymentCard = None			

			#save it
			dispute.save()

			# reload and return the appropriate version					
			return self.get( disputeId );
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
		
