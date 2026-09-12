from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.FundsTransfer import FundsTransfer
from demo.models.Account import Account
from demo.models.ExternalAccount import ExternalAccount
from demo.models.Customer import Customer
from demo.models.Transaction import Transaction
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FundsTransfer
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FundsTransferDelegate Declaration
#======================================================================
class FundsTransferDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, fundsTransferId ):
		try:	
			fundsTransfer = FundsTransfer.objects.filter(id=fundsTransferId)
			return fundsTransfer.first();
		except FundsTransfer.DoesNotExist:
			raise ProcessingError("FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, fundsTransfer):
		for model in serializers.deserialize("json", fundsTransfer):
			model.save()
			return model;

	def create(self, fundsTransfer):
		fundsTransfer.save()
		return fundsTransfer;

	def saveFromJson(self, fundsTransfer):
		for model in serializers.deserialize("json", fundsTransfer):
			model.save()
			return fundsTransfer;
	
	def save(self, fundsTransfer):
		fundsTransfer.save()
		return fundsTransfer;
	
	def delete(self, fundsTransferId ):
		errMsg = "Failed to delete FundsTransfer from db using id " + str(fundsTransferId)
		
		try:
			fundsTransfer = FundsTransfer.objects.get(id=fundsTransferId)
			fundsTransfer.delete()
			return True
		except FundsTransfer.DoesNotExist:
			raise ProcessingError("FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = FundsTransfer.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all FundsTransfer from db")
		except Exception:
			return None;
		
	def assignSourceAccount( self, fundsTransferId, sourceAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(sourceAccountId) + " for SourceAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(sourceAccountId).first();
			
			# assign the SourceAccount		
			fundsTransfer.sourceAccount = account
			
			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(sourceAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSourceAccount( self, fundsTransferId ):
		errMsg = "Failed to unassign element " + str(sourceAccountId) + " for SourceAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# assign to None for unassignment
			fundsTransfer.account = None			

			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDestinationAccount( self, fundsTransferId, destinationAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(destinationAccountId) + " for DestinationAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(destinationAccountId).first();
			
			# assign the DestinationAccount		
			fundsTransfer.destinationAccount = account
			
			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(destinationAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDestinationAccount( self, fundsTransferId ):
		errMsg = "Failed to unassign element " + str(destinationAccountId) + " for DestinationAccount on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# assign to None for unassignment
			fundsTransfer.account = None			

			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
		
	def assignExternalBeneficiary( self, fundsTransferId, externalBeneficiaryId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		errMsg = "Failed to assign element " + str(externalBeneficiaryId) + " for ExternalBeneficiary on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(externalBeneficiaryId).first();
			
			# assign the ExternalBeneficiary		
			fundsTransfer.externalBeneficiary = externalAccount
			
			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalBeneficiaryId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExternalBeneficiary( self, fundsTransferId ):
		errMsg = "Failed to unassign element " + str(externalBeneficiaryId) + " for ExternalBeneficiary on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# assign to None for unassignment
			fundsTransfer.externalAccount = None			

			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
		
	def assignInitiatedBy( self, fundsTransferId, initiatedById ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(initiatedById) + " for InitiatedBy on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(initiatedById).first();
			
			# assign the InitiatedBy		
			fundsTransfer.initiatedBy = customer
			
			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(initiatedById) + " does not exist.")
		except Exception:
			return None;
				
	def unassignInitiatedBy( self, fundsTransferId ):
		errMsg = "Failed to unassign element " + str(initiatedById) + " for InitiatedBy on FundsTransfer"

		try:
			# get the FundsTransfer from db
			fundsTransfer = self.get( fundsTransferId ).first()	
			
			# assign to None for unassignment
			fundsTransfer.customer = None			

			#save it
			fundsTransfer.save()

			# reload and return the appropriate version					
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Exception:
			return None;
		
	def addTransactions( self, fundsTransferId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to add elements " + str(transactionsIds) + " for Transactions on FundsTransfer"

		try:
			# get the FundsTransfer
			fundsTransfer = self.get( fundsTransferId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				fundsTransfer.transactions.add(transaction)
				
			# save it		
			fundsTransfer.save()
			
			# reload and return the appropriate version
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTransactions( self, fundsTransferId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to remove elements " + str(transactionsIds) + " for Transactions on FundsTransfer"

		try:
			# get the FundsTransfer
			fundsTransfer = self.get( fundsTransferId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				fundsTransfer.transactions.remove(transaction)
				
			# save it		
			fundsTransfer.save()
			
			# reload and return the appropriate version
			return self.get( fundsTransferId );
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer with id " + str(fundsTransferId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
