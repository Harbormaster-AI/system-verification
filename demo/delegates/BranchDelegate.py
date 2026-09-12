from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Branch import Branch
from demo.models.Bank import Bank
from demo.models.Account import Account
from demo.models.LoanAccount import LoanAccount
from demo.models.ATM import ATM
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Branch
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BranchDelegate Declaration
#======================================================================
class BranchDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, branchId ):
		try:	
			branch = Branch.objects.filter(id=branchId)
			return branch.first();
		except Branch.DoesNotExist:
			raise ProcessingError("Branch with id " + str(branchId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, branch):
		for model in serializers.deserialize("json", branch):
			model.save()
			return model;

	def create(self, branch):
		branch.save()
		return branch;

	def saveFromJson(self, branch):
		for model in serializers.deserialize("json", branch):
			model.save()
			return branch;
	
	def save(self, branch):
		branch.save()
		return branch;
	
	def delete(self, branchId ):
		errMsg = "Failed to delete Branch from db using id " + str(branchId)
		
		try:
			branch = Branch.objects.get(id=branchId)
			branch.delete()
			return True
		except Branch.DoesNotExist:
			raise ProcessingError("Branch with id " + str(branchId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Branch.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Branch from db")
		except Exception:
			return None;
		
	def assignBank( self, branchId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on Branch"

		try:
			# get the Branch from db
			branch = self.get( branchId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			branch.bank = bank
			
			#save it
			branch.save()

			# reload and return the appropriate version					
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, branchId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on Branch"

		try:
			# get the Branch from db
			branch = self.get( branchId ).first()	
			
			# assign to None for unassignment
			branch.bank = None			

			#save it
			branch.save()

			# reload and return the appropriate version					
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, branchId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to add elements " + str(accountsIds) + " for Accounts on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				branch.accounts.add(account)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAccounts( self, branchId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to remove elements " + str(accountsIds) + " for Accounts on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				branch.accounts.remove(account)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addLoanAccounts( self, branchId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				branch.loanAccounts.add(loanAccount)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeLoanAccounts( self, branchId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				branch.loanAccounts.remove(loanAccount)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAtms( self, branchId, atmsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ATMDelegate import ATMDelegate

		errMsg = "Failed to add elements " + str(atmsIds) + " for Atms on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = atmsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ATM		
				aTM = ATMDelegate().get(id).first();	
				# add the ATM
				branch.atms.add(aTM)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except ATM.DoesNotExist:
			raise ProcessingError(errMsg + " : ATM does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAtms( self, branchId, atmsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ATMDelegate import ATMDelegate

		errMsg = "Failed to remove elements " + str(atmsIds) + " for Atms on Branch"

		try:
			# get the Branch
			branch = self.get( branchId ).first()
				
			# split on a comma with no spaces
			idList = atmsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ATM		
				aTM = ATMDelegate().get(id).first();	
				# add the ATM
				branch.atms.remove(aTM)
				
			# save it		
			branch.save()
			
			# reload and return the appropriate version
			return self.get( branchId );
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except ATM.DoesNotExist:
			raise ProcessingError(errMsg + " : ATM does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
