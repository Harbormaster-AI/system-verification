from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.BankingProduct import BankingProduct
from demo.models.Bank import Bank
from demo.models.Account import Account
from demo.models.LoanAccount import LoanAccount
from demo.models.PaymentCard import PaymentCard
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model BankingProduct
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BankingProductDelegate Declaration
#======================================================================
class BankingProductDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, bankingProductId ):
		try:	
			bankingProduct = BankingProduct.objects.filter(id=bankingProductId)
			return bankingProduct.first();
		except BankingProduct.DoesNotExist:
			raise ProcessingError("BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, bankingProduct):
		for model in serializers.deserialize("json", bankingProduct):
			model.save()
			return model;

	def create(self, bankingProduct):
		bankingProduct.save()
		return bankingProduct;

	def saveFromJson(self, bankingProduct):
		for model in serializers.deserialize("json", bankingProduct):
			model.save()
			return bankingProduct;
	
	def save(self, bankingProduct):
		bankingProduct.save()
		return bankingProduct;
	
	def delete(self, bankingProductId ):
		errMsg = "Failed to delete BankingProduct from db using id " + str(bankingProductId)
		
		try:
			bankingProduct = BankingProduct.objects.get(id=bankingProductId)
			bankingProduct.delete()
			return True
		except BankingProduct.DoesNotExist:
			raise ProcessingError("BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = BankingProduct.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all BankingProduct from db")
		except Exception:
			return None;
		
	def assignBank( self, bankingProductId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on BankingProduct"

		try:
			# get the BankingProduct from db
			bankingProduct = self.get( bankingProductId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			bankingProduct.bank = bank
			
			#save it
			bankingProduct.save()

			# reload and return the appropriate version					
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, bankingProductId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on BankingProduct"

		try:
			# get the BankingProduct from db
			bankingProduct = self.get( bankingProductId ).first()	
			
			# assign to None for unassignment
			bankingProduct.bank = None			

			#save it
			bankingProduct.save()

			# reload and return the appropriate version					
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, bankingProductId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to add elements " + str(accountsIds) + " for Accounts on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bankingProduct.accounts.add(account)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAccounts( self, bankingProductId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to remove elements " + str(accountsIds) + " for Accounts on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bankingProduct.accounts.remove(account)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addLoanAccounts( self, bankingProductId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bankingProduct.loanAccounts.add(loanAccount)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeLoanAccounts( self, bankingProductId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bankingProduct.loanAccounts.remove(loanAccount)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addPaymentCards( self, bankingProductId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to add elements " + str(paymentCardsIds) + " for PaymentCards on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bankingProduct.paymentCards.add(paymentCard)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removePaymentCards( self, bankingProductId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to remove elements " + str(paymentCardsIds) + " for PaymentCards on BankingProduct"

		try:
			# get the BankingProduct
			bankingProduct = self.get( bankingProductId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bankingProduct.paymentCards.remove(paymentCard)
				
			# save it		
			bankingProduct.save()
			
			# reload and return the appropriate version
			return self.get( bankingProductId );
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(bankingProductId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
