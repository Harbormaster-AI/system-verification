from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Transaction import Transaction
from demo.models.Account import Account
from demo.models.ExternalAccount import ExternalAccount
from demo.models.PaymentCard import PaymentCard
from demo.models.FundsTransfer import FundsTransfer
from demo.models.FXTrade import FXTrade
from demo.models.Dispute import Dispute
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Transaction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class TransactionDelegate Declaration
#======================================================================
class TransactionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, transactionId ):
		try:	
			transaction = Transaction.objects.filter(id=transactionId)
			return transaction.first();
		except Transaction.DoesNotExist:
			raise ProcessingError("Transaction with id " + str(transactionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

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
	
	def delete(self, transactionId ):
		errMsg = "Failed to delete Transaction from db using id " + str(transactionId)
		
		try:
			transaction = Transaction.objects.get(id=transactionId)
			transaction.delete()
			return True
		except Transaction.DoesNotExist:
			raise ProcessingError("Transaction with id " + str(transactionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Transaction.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Transaction from db")
		except Exception:
			return None;
		
	def assignAccount( self, transactionId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			transaction.account = account
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, transactionId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.account = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignExternalCounterparty( self, transactionId, externalCounterpartyId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		errMsg = "Failed to assign element " + str(externalCounterpartyId) + " for ExternalCounterparty on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(externalCounterpartyId).first();
			
			# assign the ExternalCounterparty		
			transaction.externalCounterparty = externalAccount
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalCounterpartyId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExternalCounterparty( self, transactionId ):
		errMsg = "Failed to unassign element " + str(externalCounterpartyId) + " for ExternalCounterparty on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.externalAccount = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignPaymentCard( self, transactionId, paymentCardId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to assign element " + str(paymentCardId) + " for PaymentCard on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the PaymentCard from db
			paymentCard = PaymentCardDelegate().get(paymentCardId).first();
			
			# assign the PaymentCard		
			transaction.paymentCard = paymentCard
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignPaymentCard( self, transactionId ):
		errMsg = "Failed to unassign element " + str(paymentCardId) + " for PaymentCard on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.paymentCard = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignFundsTransfer( self, transactionId, fundsTransferId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FundsTransferDelegate import FundsTransferDelegate

		errMsg = "Failed to assign element " + str(fundsTransferId) + " for FundsTransfer on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the FundsTransfer from db
			fundsTransfer = FundsTransferDelegate().get(fundsTransferId).first();
			
			# assign the FundsTransfer		
			transaction.fundsTransfer = fundsTransfer
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFundsTransfer( self, transactionId ):
		errMsg = "Failed to unassign element " + str(fundsTransferId) + " for FundsTransfer on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.fundsTransfer = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignFxTrade( self, transactionId, fxTradeId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FXTradeDelegate import FXTradeDelegate

		errMsg = "Failed to assign element " + str(fxTradeId) + " for FxTrade on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the FXTrade from db
			fXTrade = FXTradeDelegate().get(fxTradeId).first();
			
			# assign the FxTrade		
			transaction.fxTrade = fXTrade
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fxTradeId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFxTrade( self, transactionId ):
		errMsg = "Failed to unassign element " + str(fxTradeId) + " for FxTrade on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.fXTrade = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDispute( self, transactionId, disputeId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.DisputeDelegate import DisputeDelegate

		errMsg = "Failed to assign element " + str(disputeId) + " for Dispute on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# get the Dispute from db
			dispute = DisputeDelegate().get(disputeId).first();
			
			# assign the Dispute		
			transaction.dispute = dispute
			
			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute with id " + str(disputeId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDispute( self, transactionId ):
		errMsg = "Failed to unassign element " + str(disputeId) + " for Dispute on Transaction"

		try:
			# get the Transaction from db
			transaction = self.get( transactionId ).first()	
			
			# assign to None for unassignment
			transaction.dispute = None			

			#save it
			transaction.save()

			# reload and return the appropriate version					
			return self.get( transactionId );
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
		
