from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Account import Account
from demo.models.Bank import Bank
from demo.models.Branch import Branch
from demo.models.BankingProduct import BankingProduct
from demo.models.Customer import Customer
from demo.models.Transaction import Transaction
from demo.models.AccountStatement import AccountStatement
from demo.models.StandingInstruction import StandingInstruction
from demo.models.FeeCharge import FeeCharge
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Account
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class AccountDelegate Declaration
#======================================================================
class AccountDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, accountId ):
		try:	
			account = Account.objects.filter(id=accountId)
			return account.first();
		except Account.DoesNotExist:
			raise ProcessingError("Account with id " + str(accountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, account):
		for model in serializers.deserialize("json", account):
			model.save()
			return model;

	def create(self, account):
		account.save()
		return account;

	def saveFromJson(self, account):
		for model in serializers.deserialize("json", account):
			model.save()
			return account;
	
	def save(self, account):
		account.save()
		return account;
	
	def delete(self, accountId ):
		errMsg = "Failed to delete Account from db using id " + str(accountId)
		
		try:
			account = Account.objects.get(id=accountId)
			account.delete()
			return True
		except Account.DoesNotExist:
			raise ProcessingError("Account with id " + str(accountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Account.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Account from db")
		except Exception:
			return None;
		
	def assignBank( self, accountId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			account.bank = bank
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, accountId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# assign to None for unassignment
			account.bank = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
		
	def assignBranch( self, accountId, branchId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BranchDelegate import BranchDelegate

		errMsg = "Failed to assign element " + str(branchId) + " for Branch on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branchId).first();
			
			# assign the Branch		
			account.branch = branch
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, accountId ):
		errMsg = "Failed to unassign element " + str(branchId) + " for Branch on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# assign to None for unassignment
			account.branch = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
		
	def assignProduct( self, accountId, productId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankingProductDelegate import BankingProductDelegate

		errMsg = "Failed to assign element " + str(productId) + " for Product on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# get the BankingProduct from db
			bankingProduct = BankingProductDelegate().get(productId).first();
			
			# assign the Product		
			account.product = bankingProduct
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(productId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignProduct( self, accountId ):
		errMsg = "Failed to unassign element " + str(productId) + " for Product on Account"

		try:
			# get the Account from db
			account = self.get( accountId ).first()	
			
			# assign to None for unassignment
			account.bankingProduct = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
		
	def addOwners( self, accountId, ownersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to add elements " + str(ownersIds) + " for Owners on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = ownersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				account.owners.add(customer)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeOwners( self, accountId, ownersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to remove elements " + str(ownersIds) + " for Owners on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = ownersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				account.owners.remove(customer)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addTransactions( self, accountId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to add elements " + str(transactionsIds) + " for Transactions on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				account.transactions.add(transaction)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTransactions( self, accountId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to remove elements " + str(transactionsIds) + " for Transactions on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				account.transactions.remove(transaction)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addStatements( self, accountId, statementsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountStatementDelegate import AccountStatementDelegate

		errMsg = "Failed to add elements " + str(statementsIds) + " for Statements on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = statementsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the AccountStatement		
				accountStatement = AccountStatementDelegate().get(id).first();	
				# add the AccountStatement
				account.statements.add(accountStatement)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except AccountStatement.DoesNotExist:
			raise ProcessingError(errMsg + " : AccountStatement does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStatements( self, accountId, statementsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountStatementDelegate import AccountStatementDelegate

		errMsg = "Failed to remove elements " + str(statementsIds) + " for Statements on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = statementsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the AccountStatement		
				accountStatement = AccountStatementDelegate().get(id).first();	
				# add the AccountStatement
				account.statements.remove(accountStatement)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except AccountStatement.DoesNotExist:
			raise ProcessingError(errMsg + " : AccountStatement does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addStandingInstructions( self, accountId, standingInstructionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.StandingInstructionDelegate import StandingInstructionDelegate

		errMsg = "Failed to add elements " + str(standingInstructionsIds) + " for StandingInstructions on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = standingInstructionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the StandingInstruction		
				standingInstruction = StandingInstructionDelegate().get(id).first();	
				# add the StandingInstruction
				account.standingInstructions.add(standingInstruction)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStandingInstructions( self, accountId, standingInstructionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.StandingInstructionDelegate import StandingInstructionDelegate

		errMsg = "Failed to remove elements " + str(standingInstructionsIds) + " for StandingInstructions on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = standingInstructionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the StandingInstruction		
				standingInstruction = StandingInstructionDelegate().get(id).first();	
				# add the StandingInstruction
				account.standingInstructions.remove(standingInstruction)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addFeeCharges( self, accountId, feeChargesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

		errMsg = "Failed to add elements " + str(feeChargesIds) + " for FeeCharges on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = feeChargesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FeeCharge		
				feeCharge = FeeChargeDelegate().get(id).first();	
				# add the FeeCharge
				account.feeCharges.add(feeCharge)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFeeCharges( self, accountId, feeChargesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

		errMsg = "Failed to remove elements " + str(feeChargesIds) + " for FeeCharges on Account"

		try:
			# get the Account
			account = self.get( accountId ).first()
				
			# split on a comma with no spaces
			idList = feeChargesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FeeCharge		
				feeCharge = FeeChargeDelegate().get(id).first();	
				# add the FeeCharge
				account.feeCharges.remove(feeCharge)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( accountId );
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
