

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.AccountStatement import AccountStatement
from bankingOnDjango.models.Account import Account
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model AccountStatement
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountStatementDelegate Declaration
#======================================================================
class AccountStatementDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, account_statement_id ):
		err_msg = "Failed to get AccountStatement from db using id " + str(account_statement_id)
		try:	
			account_statement = AccountStatement.objects.filter(id=account_statement_id)
			return account_statement.first();
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError("AccountStatement with id " + str(account_statement_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, account_statement):
		for model in serializers.deserialize("json", account_statement):
			model.save()
			return model;

	def create(self, account_statement):
		account_statement.save()
		return account_statement;

	def saveFromJson(self, account_statement):
		for model in serializers.deserialize("json", account_statement):
			model.save()
			return account_statement;
	
	def save(self, account_statement):
		account_statement.save()
		return account_statement;
	
	def delete(self, account_statement_id ):
		err_msg = "Failed to delete AccountStatement from db using id " + str(account_statement_id)
		
		try:
			account_statement = AccountStatement.objects.get(id=account_statement_id)
			account_statement.delete()
			return True
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError("AccountStatement with id " + str(account_statement_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = AccountStatement.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all AccountStatement from db")
		except Exception:
			return None;
		
	def assignAccount( self, account_statement_id, account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import child_delegate

		err_msg = "Failed to assign element " + str(account_id) + " for Account on AccountStatement"

		try:
			# get the AccountStatement from db
			account_statement = self.get( account_statement_id ).first()	
			
			# get the Account from db
			account = child_delegate.get(account_id).first();
			
			# assign the Account		
			account_statement.account = account
			
			#save it
			account_statement.save()

			# reload and return the appropriate version					
			return self.get( account_statement_id );
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : AccountStatement with id " + str(account_statement_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, account_statement_id ):
		err_msg = "Failed to unassign element " + str(account_statement_id) + " for Account on AccountStatement"

		try:
			# get the AccountStatement from db
			account_statement = self.get( account_statement_id ).first()	
			
			# assign to None for unassignment
			account_statement.account = None			

			#save it
			account_statement.save()

			# reload and return the appropriate version					
			return self.get( account_statement_id );
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : AccountStatement with id " + str(account_statement_id) + " does not exist.")
		except Exception:
			return None;
		
