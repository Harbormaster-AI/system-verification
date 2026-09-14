from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.PaymentCard import PaymentCard
from demo.models.Bank import Bank
from demo.models.Account import Account
from demo.models.Customer import Customer
from demo.models.Transaction import Transaction
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model PaymentCard
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class PaymentCardDelegate Declaration
#======================================================================
class PaymentCardDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, paymentCardId ):
		try:	
			paymentCard = PaymentCard.objects.filter(id=paymentCardId)
			return paymentCard.first();
		except PaymentCard.DoesNotExist:
			raise ProcessingError("PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, paymentCard):
		for model in serializers.deserialize("json", paymentCard):
			model.save()
			return model;

	def create(self, paymentCard):
		paymentCard.save()
		return paymentCard;

	def saveFromJson(self, paymentCard):
		for model in serializers.deserialize("json", paymentCard):
			model.save()
			return paymentCard;
	
	def save(self, paymentCard):
		paymentCard.save()
		return paymentCard;
	
	def delete(self, paymentCardId ):
		errMsg = "Failed to delete PaymentCard from db using id " + str(paymentCardId)
		
		try:
			paymentCard = PaymentCard.objects.get(id=paymentCardId)
			paymentCard.delete()
			return True
		except PaymentCard.DoesNotExist:
			raise ProcessingError("PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = PaymentCard.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all PaymentCard from db")
		except Exception:
			return None;
		
	def assignBank( self, paymentCardId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			paymentCard.bank = bank
			
			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, paymentCardId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# assign to None for unassignment
			paymentCard.bank = None			

			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
		
	def assignAccount( self, paymentCardId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			paymentCard.account = account
			
			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, paymentCardId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# assign to None for unassignment
			paymentCard.account = None			

			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
		
	def assignCustomer( self, paymentCardId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			paymentCard.customer = customer
			
			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, paymentCardId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on PaymentCard"

		try:
			# get the PaymentCard from db
			paymentCard = self.get( paymentCardId ).first()	
			
			# assign to None for unassignment
			paymentCard.customer = None			

			#save it
			paymentCard.save()

			# reload and return the appropriate version					
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Exception:
			return None;
		
	def addTransactions( self, paymentCardId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to add elements " + str(transactionsIds) + " for Transactions on PaymentCard"

		try:
			# get the PaymentCard
			paymentCard = self.get( paymentCardId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				paymentCard.transactions.add(transaction)
				
			# save it		
			paymentCard.save()
			
			# reload and return the appropriate version
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTransactions( self, paymentCardId, transactionsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to remove elements " + str(transactionsIds) + " for Transactions on PaymentCard"

		try:
			# get the PaymentCard
			paymentCard = self.get( paymentCardId ).first()
				
			# split on a comma with no spaces
			idList = transactionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Transaction		
				transaction = TransactionDelegate().get(id).first();	
				# add the Transaction
				paymentCard.transactions.remove(transaction)
				
			# save it		
			paymentCard.save()
			
			# reload and return the appropriate version
			return self.get( paymentCardId );
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard with id " + str(paymentCardId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
