from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.ExternalAccount import ExternalAccount
from demo.models.Customer import Customer
from demo.models.Transaction import Transaction
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ExternalAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExternalAccountDelegate Declaration
#======================================================================
class ExternalAccountDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, externalAccountId ):
		try:	
			externalAccount = ExternalAccount.objects.filter(id=externalAccountId)
			return externalAccount.first();
		except ExternalAccount.DoesNotExist:
			raise ProcessingError("ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, externalAccount):
		for model in serializers.deserialize("json", externalAccount):
			model.save()
			return model;

	def create(self, externalAccount):
		externalAccount.save()
		return externalAccount;

	def saveFromJson(self, externalAccount):
		for model in serializers.deserialize("json", externalAccount):
			model.save()
			return externalAccount;
	
	def save(self, externalAccount):
		externalAccount.save()
		return externalAccount;
	
	def delete(self, externalAccountId ):
		errMsg = "Failed to delete ExternalAccount from db using id " + str(externalAccountId)
		
		try:
			externalAccount = ExternalAccount.objects.get(id=externalAccountId)
			externalAccount.delete()
			return True
		except ExternalAccount.DoesNotExist:
			raise ProcessingError("ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ExternalAccount.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ExternalAccount from db")
		except Exception:
			return None;
		
	def assignCustomer( self, externalAccountId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on ExternalAccount"

		try:
			# get the ExternalAccount from db
			externalAccount = self.get( externalAccountId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			externalAccount.customer = customer
			
			#save it
			externalAccount.save()

			# reload and return the appropriate version					
			return self.get( externalAccountId );
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, externalAccountId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on ExternalAccount"

		try:
			# get the ExternalAccount from db
			externalAccount = self.get( externalAccountId ).first()	
			
			# assign to None for unassignment
			externalAccount.customer = None			

			#save it
			externalAccount.save()

			# reload and return the appropriate version					
			return self.get( externalAccountId );
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except Exception:
			return None;
		
	def addTransactions( self, externalAccountId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to add elements " + str(transactionsIds) + " for Transactions on ExternalAccount"

		try:
			# get the ExternalAccount
			externalAccount = self.get( externalAccountId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				externalAccount.transactions.add(transaction)
				
			# save it		
			externalAccount.save()
			
			# reload and return the appropriate version
			return self.get( externalAccountId );
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTransactions( self, externalAccountId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to remove elements " + str(transactionsIds) + " for Transactions on ExternalAccount"

		try:
			# get the ExternalAccount
			externalAccount = self.get( externalAccountId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				externalAccount.transactions.remove(transaction)
				
			# save it		
			externalAccount.save()
			
			# reload and return the appropriate version
			return self.get( externalAccountId );
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(externalAccountId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
