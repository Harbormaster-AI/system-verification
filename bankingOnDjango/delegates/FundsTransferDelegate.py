
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FundsTransfer
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FundsTransferDelegate Declaration
#======================================================================
class FundsTransferDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, funds_transfer_id ):
		try:	
			funds_transfer = FundsTransfer.objects.filter(id=funds_transfer_id)
			return funds_transfer.first();
		except FundsTransfer.DoesNotExist:
			raise ProcessingError("FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 

	def createFromJson(self, funds_transfer):
		for model in serializers.deserialize("json", funds_transfer):
			model.save()
			return model;

	def create(self, funds_transfer):
		funds_transfer.save()
		return funds_transfer;

	def saveFromJson(self, funds_transfer):
		for model in serializers.deserialize("json", funds_transfer):
			model.save()
			return funds_transfer;
	
	def save(self, funds_transfer):
		funds_transfer.save()
		return funds_transfer;
	
	def delete(self, funds_transfer_id ):
		err_msg = "Failed to delete FundsTransfer from db using id " + str(funds_transfer_id)
		
		try:
			funds_transfer = FundsTransfer.objects.get(id=funds_transfer_id)
			funds_transfer.delete()
			return True
		except FundsTransfer.DoesNotExist:
			raise ProcessingError("FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = FundsTransfer.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all FundsTransfer from db")
		except Exception:
			return None;
		
	def assignSourceAccount( self, funds_transfer_id, sourceAccountId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(sourceAccountId) + " for SourceAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(sourceAccountId).first();
			
			# assign the SourceAccount		
			funds_transfer.sourceAccount = account
			
			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account with id " + str(sourceAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSourceAccount( self, funds_transfer_id ):
		err_msg = "Failed to unassign element " + str(sourceAccountId) + " for SourceAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# assign to None for unassignment
			funds_transfer.account = None			

			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignDestinationAccount( self, funds_transfer_id, destinationAccountId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(destinationAccountId) + " for DestinationAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(destinationAccountId).first();
			
			# assign the DestinationAccount		
			funds_transfer.destinationAccount = account
			
			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account with id " + str(destinationAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDestinationAccount( self, funds_transfer_id ):
		err_msg = "Failed to unassign element " + str(destinationAccountId) + " for DestinationAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# assign to None for unassignment
			funds_transfer.account = None			

			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignExternalBeneficiary( self, funds_transfer_id, externalBeneficiaryId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to assign element " + str(externalBeneficiaryId) + " for ExternalBeneficiary on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(externalBeneficiaryId).first();
			
			# assign the ExternalBeneficiary		
			funds_transfer.externalBeneficiary = externalAccount
			
			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : ExternalAccount with id " + str(externalBeneficiaryId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExternalBeneficiary( self, funds_transfer_id ):
		err_msg = "Failed to unassign element " + str(externalBeneficiaryId) + " for ExternalBeneficiary on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# assign to None for unassignment
			funds_transfer.externalAccount = None			

			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignInitiatedBy( self, funds_transfer_id, initiatedById ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to assign element " + str(initiatedById) + " for InitiatedBy on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(initiatedById).first();
			
			# assign the InitiatedBy		
			funds_transfer.initiatedBy = customer
			
			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(initiatedById) + " does not exist.")
		except Exception:
			return None;
				
	def unassignInitiatedBy( self, funds_transfer_id ):
		err_msg = "Failed to unassign element " + str(initiatedById) + " for InitiatedBy on FundsTransfer"

		try:
			# get the FundsTransfer from db
			funds_transfer = self.get( funds_transfer_id ).first()	
			
			# assign to None for unassignment
			funds_transfer.customer = None			

			#save it
			funds_transfer.save()

			# reload and return the appropriate version					
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Exception:
			return None;
		
	def addTransactions( self, funds_transfer_id, transactionsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

		err_msg = "Failed to add elements " + str(transactionsIds) + " for Transactions on FundsTransfer"

		try:
			# get the FundsTransfer
			funds_transfer = self.get( funds_transfer_id ).first()
				
			# iterate over ids
			for id in transactionsIds:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				funds_transfer.transactions.add(transaction)
				
			# save it		
			funds_transfer.save()
			
			# reload and return the appropriate version
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeTransactions( self, funds_transfer_id, transactionsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

		err_msg = "Failed to remove elements " + str(transactionsIds) + " for Transactions on FundsTransfer"

		try:
			# get the FundsTransfer
			funds_transfer = self.get( funds_transfer_id ).first()
				
			# iterate over ids
			for id in transactionsIds:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				funds_transfer.transactions.remove(transaction)
				
			# save it		
			funds_transfer.save()
			
			# reload and return the appropriate version
			return self.get( funds_transfer_id );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer with id " + str(funds_transfer_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(err_msg + " : Transaction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
