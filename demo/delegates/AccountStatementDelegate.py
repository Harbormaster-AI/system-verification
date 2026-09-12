from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.AccountStatement import AccountStatement
from demo.models.Account import Account
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model AccountStatement
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountStatementDelegate Declaration
#======================================================================
class AccountStatementDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, accountStatementId ):
		try:	
			accountStatement = AccountStatement.objects.filter(id=accountStatementId)
			return accountStatement.first();
		except AccountStatement.DoesNotExist:
			raise ProcessingError("AccountStatement with id " + str(accountStatementId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, accountStatement):
		for model in serializers.deserialize("json", accountStatement):
			model.save()
			return model;

	def create(self, accountStatement):
		accountStatement.save()
		return accountStatement;

	def saveFromJson(self, accountStatement):
		for model in serializers.deserialize("json", accountStatement):
			model.save()
			return accountStatement;
	
	def save(self, accountStatement):
		accountStatement.save()
		return accountStatement;
	
	def delete(self, accountStatementId ):
		errMsg = "Failed to delete AccountStatement from db using id " + str(accountStatementId)
		
		try:
			accountStatement = AccountStatement.objects.get(id=accountStatementId)
			accountStatement.delete()
			return True
		except AccountStatement.DoesNotExist:
			raise ProcessingError("AccountStatement with id " + str(accountStatementId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = AccountStatement.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all AccountStatement from db")
		except Exception:
			return None;
		
	def assignAccount( self, accountStatementId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on AccountStatement"

		try:
			# get the AccountStatement from db
			accountStatement = self.get( accountStatementId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			accountStatement.account = account
			
			#save it
			accountStatement.save()

			# reload and return the appropriate version					
			return self.get( accountStatementId );
		except AccountStatement.DoesNotExist:
			raise ProcessingError(errMsg + " : AccountStatement with id " + str(accountStatementId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, accountStatementId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on AccountStatement"

		try:
			# get the AccountStatement from db
			accountStatement = self.get( accountStatementId ).first()	
			
			# assign to None for unassignment
			accountStatement.account = None			

			#save it
			accountStatement.save()

			# reload and return the appropriate version					
			return self.get( accountStatementId );
		except AccountStatement.DoesNotExist:
			raise ProcessingError(errMsg + " : AccountStatement with id " + str(accountStatementId) + " does not exist.")
		except Exception:
			return None;
		
