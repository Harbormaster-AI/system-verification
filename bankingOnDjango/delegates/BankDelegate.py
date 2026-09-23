

from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.ExchangeRate import ExchangeRate
from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.models.ThirdPartyProvider import ThirdPartyProvider
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Bank
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankDelegate Declaration
#======================================================================
class BankDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, bank_id ):
		err_msg = "Failed to get Bank from db using id " + str(bank_id)
		try:	
			bank = Bank.objects.filter(id=bank_id)
			return bank.first();
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError("Bank with id " + str(bank_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

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
	
	def delete(self, bank_id ):
		err_msg = "Failed to delete Bank from db using id " + str(bank_id)
		
		try:
			bank = Bank.objects.get(id=bank_id)
			bank.delete()
			return True
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError("Bank with id " + str(bank_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Bank.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all Bank from db")
		except Exception:
			return None;
		
	def addBranches( self, bank_id, branchesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

		err_msg = "Failed to add elements " + str(branchesIds) + " for Branches on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in branchesIds:
				# read the Branch		
				branch = BranchDelegate().get(id).first();	
				# add the Branch
				bank.branches.add(branch)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Branch.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Branch does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeBranches( self, bank_id, branchesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

		err_msg = "Failed to remove elements " + str(branchesIds) + " for Branches on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in branchesIds:
				# read the Branch		
				branch = BranchDelegate().get(id).first();	
				# add the Branch
				bank.branches.remove(branch)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Branch.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Branch does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addProducts( self, bank_id, productsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

		err_msg = "Failed to add elements " + str(productsIds) + " for Products on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in productsIds:
				# read the BankingProduct		
				bankingProduct = BankingProductDelegate().get(id).first();	
				# add the BankingProduct
				bank.products.add(bankingProduct)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeProducts( self, bank_id, productsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

		err_msg = "Failed to remove elements " + str(productsIds) + " for Products on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in productsIds:
				# read the BankingProduct		
				bankingProduct = BankingProductDelegate().get(id).first();	
				# add the BankingProduct
				bank.products.remove(bankingProduct)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addCustomers( self, bank_id, customersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to add elements " + str(customersIds) + " for Customers on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in customersIds:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				bank.customers.add(customer)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeCustomers( self, bank_id, customersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to remove elements " + str(customersIds) + " for Customers on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in customersIds:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				bank.customers.remove(customer)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addAccounts( self, bank_id, accountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to add elements " + str(accountsIds) + " for Accounts on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in accountsIds:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bank.accounts.add(account)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeAccounts( self, bank_id, accountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to remove elements " + str(accountsIds) + " for Accounts on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in accountsIds:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				bank.accounts.remove(account)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addPaymentCards( self, bank_id, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to add elements " + str(paymentCardsIds) + " for PaymentCards on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in paymentCardsIds:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bank.paymentCards.add(paymentCard)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removePaymentCards( self, bank_id, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to remove elements " + str(paymentCardsIds) + " for PaymentCards on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in paymentCardsIds:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				bank.paymentCards.remove(paymentCard)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addLoanAccounts( self, bank_id, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in loanAccountsIds:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bank.loanAccounts.add(loanAccount)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeLoanAccounts( self, bank_id, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in loanAccountsIds:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				bank.loanAccounts.remove(loanAccount)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addExchangeRates( self, bank_id, exchangeRatesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

		err_msg = "Failed to add elements " + str(exchangeRatesIds) + " for ExchangeRates on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in exchangeRatesIds:
				# read the ExchangeRate		
				exchangeRate = ExchangeRateDelegate().get(id).first();	
				# add the ExchangeRate
				bank.exchangeRates.add(exchangeRate)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ExchangeRate does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeExchangeRates( self, bank_id, exchangeRatesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

		err_msg = "Failed to remove elements " + str(exchangeRatesIds) + " for ExchangeRates on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in exchangeRatesIds:
				# read the ExchangeRate		
				exchangeRate = ExchangeRateDelegate().get(id).first();	
				# add the ExchangeRate
				bank.exchangeRates.remove(exchangeRate)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ExchangeRate does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addConsents( self, bank_id, consentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

		err_msg = "Failed to add elements " + str(consentsIds) + " for Consents on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in consentsIds:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				bank.consents.add(consent)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeConsents( self, bank_id, consentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

		err_msg = "Failed to remove elements " + str(consentsIds) + " for Consents on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in consentsIds:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				bank.consents.remove(consent)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addThirdPartyProviders( self, bank_id, thirdPartyProvidersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

		err_msg = "Failed to add elements " + str(thirdPartyProvidersIds) + " for ThirdPartyProviders on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in thirdPartyProvidersIds:
				# read the ThirdPartyProvider		
				thirdPartyProvider = ThirdPartyProviderDelegate().get(id).first();	
				# add the ThirdPartyProvider
				bank.thirdPartyProviders.add(thirdPartyProvider)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except ThirdPartyProvider.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ThirdPartyProvider does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeThirdPartyProviders( self, bank_id, thirdPartyProvidersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

		err_msg = "Failed to remove elements " + str(thirdPartyProvidersIds) + " for ThirdPartyProviders on Bank"

		try:
			# get the Bank
			bank = self.get( bank_id ).first()
				
			# iterate over ids
			for id in thirdPartyProvidersIds:
				# read the ThirdPartyProvider		
				thirdPartyProvider = ThirdPartyProviderDelegate().get(id).first();	
				# add the ThirdPartyProvider
				bank.thirdPartyProviders.remove(thirdPartyProvider)
				
			# save it		
			bank.save()
			
			# reload and return the appropriate version
			return self.get( bank_id );
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except ThirdPartyProvider.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ThirdPartyProvider does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
