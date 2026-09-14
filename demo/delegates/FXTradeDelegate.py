from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.FXTrade import FXTrade
from demo.models.Customer import Customer
from demo.models.Bank import Bank
from demo.models.ExchangeRate import ExchangeRate
from demo.models.Account import Account
from demo.models.Transaction import Transaction
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FXTrade
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FXTradeDelegate Declaration
#======================================================================
class FXTradeDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, fXTradeId ):
		try:	
			fXTrade = FXTrade.objects.filter(id=fXTradeId)
			return fXTrade.first();
		except FXTrade.DoesNotExist:
			raise ProcessingError("FXTrade with id " + str(fXTradeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, fXTrade):
		for model in serializers.deserialize("json", fXTrade):
			model.save()
			return model;

	def create(self, fXTrade):
		fXTrade.save()
		return fXTrade;

	def saveFromJson(self, fXTrade):
		for model in serializers.deserialize("json", fXTrade):
			model.save()
			return fXTrade;
	
	def save(self, fXTrade):
		fXTrade.save()
		return fXTrade;
	
	def delete(self, fXTradeId ):
		errMsg = "Failed to delete FXTrade from db using id " + str(fXTradeId)
		
		try:
			fXTrade = FXTrade.objects.get(id=fXTradeId)
			fXTrade.delete()
			return True
		except FXTrade.DoesNotExist:
			raise ProcessingError("FXTrade with id " + str(fXTradeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = FXTrade.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all FXTrade from db")
		except Exception:
			return None;
		
	def assignCustomer( self, fXTradeId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			fXTrade.customer = customer
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.customer = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignBank( self, fXTradeId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			fXTrade.bank = bank
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.bank = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignExchangeRate( self, fXTradeId, exchangeRateId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExchangeRateDelegate import ExchangeRateDelegate

		errMsg = "Failed to assign element " + str(exchangeRateId) + " for ExchangeRate on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the ExchangeRate from db
			exchangeRate = ExchangeRateDelegate().get(exchangeRateId).first();
			
			# assign the ExchangeRate		
			fXTrade.exchangeRate = exchangeRate
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExchangeRate( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(exchangeRateId) + " for ExchangeRate on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.exchangeRate = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignSourceAccount( self, fXTradeId, sourceAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(sourceAccountId) + " for SourceAccount on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(sourceAccountId).first();
			
			# assign the SourceAccount		
			fXTrade.sourceAccount = account
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(sourceAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSourceAccount( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(sourceAccountId) + " for SourceAccount on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.account = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDestinationAccount( self, fXTradeId, destinationAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(destinationAccountId) + " for DestinationAccount on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(destinationAccountId).first();
			
			# assign the DestinationAccount		
			fXTrade.destinationAccount = account
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(destinationAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDestinationAccount( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(destinationAccountId) + " for DestinationAccount on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.account = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTransaction( self, fXTradeId, transactionId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to assign element " + str(transactionId) + " for Transaction on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# get the Transaction from db
			transaction = TransactionDelegate().get(transactionId).first();
			
			# assign the Transaction		
			fXTrade.transaction = transaction
			
			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTransaction( self, fXTradeId ):
		errMsg = "Failed to unassign element " + str(transactionId) + " for Transaction on FXTrade"

		try:
			# get the FXTrade from db
			fXTrade = self.get( fXTradeId ).first()	
			
			# assign to None for unassignment
			fXTrade.transaction = None			

			#save it
			fXTrade.save()

			# reload and return the appropriate version					
			return self.get( fXTradeId );
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade with id " + str(fXTradeId) + " does not exist.")
		except Exception:
			return None;
		
