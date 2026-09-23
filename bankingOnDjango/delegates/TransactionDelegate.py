
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.FXTrade import FXTrade
from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Transaction
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TransactionDelegate Declaration
#======================================================================
class TransactionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, transaction_id ):
		try:	
			transaction = Transaction.objects.filter(id=transaction_id)
			return transaction.first();
		except Transaction.DoesNotExist:
			raise ProcessingError("Transaction with id " + str(transaction_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 

	def createFromJson(self, transaction):
		for model in serializers.deserialize("json", transaction):
			model.save()
			return model;

	def create(self, transaction):
		transaction.save()
		return transaction;

	def saveFromJson(self, transaction):
		for model in serializers.deserialize("json", transaction):
			model.save()
			return transaction;
	
	def save(self, transaction):
		transaction.save()
		return transaction;
	
	def delete(self, transaction_id ):
		err_msg = "Failed to delete Transaction from db using id " + str(transaction_id)
		
		try:
			transaction = Transaction.objects.get(id=transaction_id)
			transaction.delete()
			return True
		except Transaction.DoesNotExist:
			raise ProcessingError("Transaction with id " + str(transaction_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Transaction.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Transaction from db")
		except Exception:
			return None;
		
	def assignAccount( self, transaction_id, accountId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(accountId) + " for Account on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			transaction.account = account
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(accountId) + " for Account on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.account = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignExternalCounterparty( self, transaction_id, externalCounterpartyId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to assign element " + str(externalCounterpartyId) + " for ExternalCounterparty on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(externalCounterpartyId).first();
			
			# assign the ExternalCounterparty		
			transaction.externalCounterparty = externalAccount
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : ExternalAccount with id " + str(externalCounterpartyId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExternalCounterparty( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(externalCounterpartyId) + " for ExternalCounterparty on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.externalAccount = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignPaymentCard( self, transaction_id, paymentCardId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to assign element " + str(paymentCardId) + " for PaymentCard on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the PaymentCard from db
			paymentCard = PaymentCardDelegate().get(paymentCardId).first();
			
			# assign the PaymentCard		
			transaction.paymentCard = paymentCard
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(err_msg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignPaymentCard( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(paymentCardId) + " for PaymentCard on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.paymentCard = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignFundsTransfer( self, transaction_id, fundsTransferId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

		err_msg = "Failed to assign element " + str(fundsTransferId) + " for FundsTransfer on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the FundsTransfer from db
			fundsTransfer = FundsTransferDelegate().get(fundsTransferId).first();
			
			# assign the FundsTransfer		
			transaction.fundsTransfer = fundsTransfer
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFundsTransfer( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(fundsTransferId) + " for FundsTransfer on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.fundsTransfer = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignFxTrade( self, transaction_id, fxTradeId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FXTradeDelegate import FXTradeDelegate

		err_msg = "Failed to assign element " + str(fxTradeId) + " for FxTrade on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the FXTrade from db
			fXTrade = FXTradeDelegate().get(fxTradeId).first();
			
			# assign the FxTrade		
			transaction.fxTrade = fXTrade
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except FXTrade.DoesNotExist:
			raise ProcessingError(err_msg + " : FXTrade with id " + str(fxTradeId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFxTrade( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(fxTradeId) + " for FxTrade on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.fXTrade = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignDispute( self, transaction_id, disputeId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

		err_msg = "Failed to assign element " + str(disputeId) + " for Dispute on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# get the Dispute from db
			dispute = DisputeDelegate().get(disputeId).first();
			
			# assign the Dispute		
			transaction.dispute = dispute
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(err_msg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDispute( self, transaction_id ):
		err_msg = "Failed to unassign element " + str(disputeId) + " for Dispute on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transaction_id ).first()	
			
			# assign to None for unassignment
			transaction.dispute = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transaction_id );
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
		
