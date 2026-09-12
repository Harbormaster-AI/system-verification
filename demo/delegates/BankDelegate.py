from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Bank import Bank
from demo.models.Branch import Branch
from demo.models.BankingProduct import BankingProduct
from demo.models.Customer import Customer
from demo.models.Account import Account
from demo.models.PaymentCard import PaymentCard
from demo.models.LoanAccount import LoanAccount
from demo.models.ExchangeRate import ExchangeRate
from demo.models.Consent import Consent
from demo.models.ThirdPartyProvider import ThirdPartyProvider
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Bank
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BankDelegate Declaration
#======================================================================
class BankDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, bankId ):
		try:	
			bank = Bank.objects.filter(id=bankId)
			return bank.first();
		except Bank.DoesNotExist:
			raise ProcessingError("Bank with id " + str(bankId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, bank):
		for model in serializers.deserialize("json", bank):
			model.save()
			return model;

	def create(self, bank):
		bank.save()
		return bank;

	def saveFromJson(self, bank):
		for model in serializers.deserialize("json", bank):
			model.save()
			return bank;
	
	def save(self, bank):
		bank.save()
		return bank;
	
	def delete(self, bankId ):
		errMsg = "Failed to delete Bank from db using id " + str(bankId)
		
		try:
			bank = Bank.objects.get(id=bankId)
			bank.delete()
			return True
		except Bank.DoesNotExist:
			raise ProcessingError("Bank with id " + str(bankId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Bank.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Bank from db")
		except Exception:
			return None;
		
	def addBranches( self, bankId, branchesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BranchDelegate import BranchDelegate

		errMsg = "Failed to add elements " + str(branchesIds) + " for Branches on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = branchesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Branch		
				branch = BranchDelegate().get(id).first();	
				# add the Branch
				bank.branches.add(branch)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeBranches( self, bankId, branchesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BranchDelegate import BranchDelegate

		errMsg = "Failed to remove elements " + str(branchesIds) + " for Branches on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = branchesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Branch		
				branch = BranchDelegate().get(id).first();	
				# add the Branch
				bank.branches.remove(branch)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addProducts( self, bankId, productsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankingProductDelegate import BankingProductDelegate

		errMsg = "Failed to add elements " + str(productsIds) + " for Products on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = productsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the BankingProduct		
				bankingProduct = BankingProductDelegate().get(id).first();	
				# add the BankingProduct
				bank.products.add(bankingProduct)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeProducts( self, bankId, productsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankingProductDelegate import BankingProductDelegate

		errMsg = "Failed to remove elements " + str(productsIds) + " for Products on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = productsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the BankingProduct		
				bankingProduct = BankingProductDelegate().get(id).first();	
				# add the BankingProduct
				bank.products.remove(bankingProduct)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCustomers( self, bankId, customersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to add elements " + str(customersIds) + " for Customers on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = customersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				bank.customers.add(customer)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCustomers( self, bankId, customersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to remove elements " + str(customersIds) + " for Customers on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = customersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				bank.customers.remove(customer)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAccounts( self, bankId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to add elements " + str(accountsIds) + " for Accounts on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bank.accounts.add(account)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAccounts( self, bankId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to remove elements " + str(accountsIds) + " for Accounts on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bank.accounts.remove(account)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addPaymentCards( self, bankId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to add elements " + str(paymentCardsIds) + " for PaymentCards on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bank.paymentCards.add(paymentCard)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removePaymentCards( self, bankId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to remove elements " + str(paymentCardsIds) + " for PaymentCards on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bank.paymentCards.remove(paymentCard)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addLoanAccounts( self, bankId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bank.loanAccounts.add(loanAccount)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeLoanAccounts( self, bankId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bank.loanAccounts.remove(loanAccount)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addExchangeRates( self, bankId, exchangeRatesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExchangeRateDelegate import ExchangeRateDelegate

		errMsg = "Failed to add elements " + str(exchangeRatesIds) + " for ExchangeRates on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = exchangeRatesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ExchangeRate		
				exchangeRate = ExchangeRateDelegate().get(id).first();	
				# add the ExchangeRate
				bank.exchangeRates.add(exchangeRate)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeExchangeRates( self, bankId, exchangeRatesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExchangeRateDelegate import ExchangeRateDelegate

		errMsg = "Failed to remove elements " + str(exchangeRatesIds) + " for ExchangeRates on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = exchangeRatesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ExchangeRate		
				exchangeRate = ExchangeRateDelegate().get(id).first();	
				# add the ExchangeRate
				bank.exchangeRates.remove(exchangeRate)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addConsents( self, bankId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to add elements " + str(consentsIds) + " for Consents on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				bank.consents.add(consent)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeConsents( self, bankId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to remove elements " + str(consentsIds) + " for Consents on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				bank.consents.remove(consent)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addThirdPartyProviders( self, bankId, thirdPartyProvidersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

		errMsg = "Failed to add elements " + str(thirdPartyProvidersIds) + " for ThirdPartyProviders on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = thirdPartyProvidersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ThirdPartyProvider		
				thirdPartyProvider = ThirdPartyProviderDelegate().get(id).first();	
				# add the ThirdPartyProvider
				bank.thirdPartyProviders.add(thirdPartyProvider)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeThirdPartyProviders( self, bankId, thirdPartyProvidersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

		errMsg = "Failed to remove elements " + str(thirdPartyProvidersIds) + " for ThirdPartyProviders on Bank"

		try:
			# get the Bank
			bank = self.get( bankId ).first()
				
			# split on a comma with no spaces
			idList = thirdPartyProvidersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ThirdPartyProvider		
				thirdPartyProvider = ThirdPartyProviderDelegate().get(id).first();	
				# add the ThirdPartyProvider
				bank.thirdPartyProviders.remove(thirdPartyProvider)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bankId );
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
