

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.models.AccountStatement import AccountStatement
from bankingOnDjango.models.StandingInstruction import StandingInstruction
from bankingOnDjango.models.FeeCharge import FeeCharge
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Account
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountDelegate Declaration
#======================================================================
class AccountDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, account_id ):
		err_msg = "Failed to get Account from db using id " + str(account_id)
		try:	
			account = Account.objects.filter(id=account_id)
			return account.first();
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

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
	
	def delete(self, account_id ):
		err_msg = "Failed to delete Account from db using id " + str(account_id)
		
		try:
			account = Account.objects.get(id=account_id)
			account.delete()
			return True
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Account.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all Account from db")
		except Exception:
			return None;
		
	def assignBank( self, account_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bank_id).first();
			
			# assign the Bank		
			account.bank = bank
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, account_id ):
		err_msg = "Failed to unassign element " + str(account_id) + " for Bank on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# assign to None for unassignment
			account.bank = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignBranch( self, account_id, branch_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

		err_msg = "Failed to assign element " + str(branch_id) + " for Branch on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branch_id).first();
			
			# assign the Branch		
			account.branch = branch
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Branch.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Branch with id " + str(branch_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, account_id ):
		err_msg = "Failed to unassign element " + str(account_id) + " for Branch on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# assign to None for unassignment
			account.branch = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignProduct( self, account_id, product_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

		err_msg = "Failed to assign element " + str(product_id) + " for Product on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# get the BankingProduct from db
			banking_product = BankingProductDelegate().get(product_id).first();
			
			# assign the Product		
			account.product = banking_product
			
			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(product_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignProduct( self, account_id ):
		err_msg = "Failed to unassign element " + str(account_id) + " for Product on Account"

		try:
			# get the Account from db
			account = self.get( account_id ).first()	
			
			# assign to None for unassignment
			account.banking_product = None			

			#save it
			account.save()

			# reload and return the appropriate version					
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
		
	def addOwners( self, account_id, owners_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to add elements " + str(owners_ids) + " for Owners on Account"

		try:
			# get the Account
			account = self.get( account_id ).first()
				
			# add the children ids
			account.owners.add(owners_ids)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeOwners( self, account_id, owners_ids ):

		err_msg = "Failed to remove elements " + str(owners_ids) + " for Owners on Account"

		# lazy importing avoids circular dependenciesId
		try:
			account.owners.remove(owners_ids)

			# save it
			account.save()

			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError("Customer with id " + str(owners_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addTransactions( self, account_id, transactions_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

		err_msg = "Failed to add elements " + str(transactions_ids) + " for Transactions on Account"

		try:
			# get the Account
			account = self.get( account_id ).first()
				
			# add the children ids
			account.transactions.add(transactions_ids)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Transaction does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeTransactions( self, account_id, transactions_ids ):

		err_msg = "Failed to remove elements " + str(transactions_ids) + " for Transactions on Account"

		# lazy importing avoids circular dependenciesId
		try:
			account.transactions.remove(transactions_ids)

			# save it
			account.save()

			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise Exceptions.ProcessingError("Transaction with id " + str(transactions_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addStatements( self, account_id, statements_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountStatementDelegate import AccountStatementDelegate

		err_msg = "Failed to add elements " + str(statements_ids) + " for Statements on Account"

		try:
			# get the Account
			account = self.get( account_id ).first()
				
			# add the children ids
			account.statements.add(statements_ids)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : AccountStatement does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeStatements( self, account_id, statements_ids ):

		err_msg = "Failed to remove elements " + str(statements_ids) + " for Statements on Account"

		# lazy importing avoids circular dependenciesId
		try:
			account.statements.remove(statements_ids)

			# save it
			account.save()

			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except AccountStatement.DoesNotExist:
			raise Exceptions.ProcessingError("AccountStatement with id " + str(statements_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addStandingInstructions( self, account_id, standing_instructions_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.StandingInstructionDelegate import StandingInstructionDelegate

		err_msg = "Failed to add elements " + str(standing_instructions_ids) + " for StandingInstructions on Account"

		try:
			# get the Account
			account = self.get( account_id ).first()
				
			# add the children ids
			account.standing_instructions.add(standing_instructions_ids)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except StandingInstruction.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : StandingInstruction does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeStandingInstructions( self, account_id, standing_instructions_ids ):

		err_msg = "Failed to remove elements " + str(standing_instructions_ids) + " for StandingInstructions on Account"

		# lazy importing avoids circular dependenciesId
		try:
			account.standing_instructions.remove(standing_instructions_ids)

			# save it
			account.save()

			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except StandingInstruction.DoesNotExist:
			raise Exceptions.ProcessingError("StandingInstruction with id " + str(standing_instructions_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addFeeCharges( self, account_id, fee_charges_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

		err_msg = "Failed to add elements " + str(fee_charges_ids) + " for FeeCharges on Account"

		try:
			# get the Account
			account = self.get( account_id ).first()
				
			# add the children ids
			account.fee_charges.add(fee_charges_ids)
				
			# save it		
			account.save()
			
			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeFeeCharges( self, account_id, fee_charges_ids ):

		err_msg = "Failed to remove elements " + str(fee_charges_ids) + " for FeeCharges on Account"

		# lazy importing avoids circular dependenciesId
		try:
			account.fee_charges.remove(fee_charges_ids)

			# save it
			account.save()

			# reload and return the appropriate version
			return self.get( account_id );
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(account_id) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError("FeeCharge with id " + str(fee_charges_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
