

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model PaymentCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PaymentCardDelegate Declaration
#======================================================================
class PaymentCardDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, payment_card_id ):
		err_msg = "Failed to get PaymentCard from db using id " + str(payment_card_id)
		try:	
			payment_card = PaymentCard.objects.filter(id=payment_card_id)
			return payment_card.first();
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError("PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, payment_card):
		for model in serializers.deserialize("json", payment_card):
			model.save()
			return model;

	def create(self, payment_card):
		payment_card.save()
		return payment_card;

	def saveFromJson(self, payment_card):
		for model in serializers.deserialize("json", payment_card):
			model.save()
			return payment_card;
	
	def save(self, payment_card):
		payment_card.save()
		return payment_card;
	
	def delete(self, payment_card_id ):
		err_msg = "Failed to delete PaymentCard from db using id " + str(payment_card_id)
		
		try:
			payment_card = PaymentCard.objects.get(id=payment_card_id)
			payment_card.delete()
			return True
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError("PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = PaymentCard.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all PaymentCard from db")
		except Exception:
			return None;
		
	def assignBank( self, payment_card_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bank_id).first();
			
			# assign the Bank		
			payment_card.bank = bank
			
			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, payment_card_id ):
		err_msg = "Failed to unassign element " + str(payment_card_id) + " for Bank on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# assign to None for unassignment
			payment_card.bank = None			

			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignAccount( self, payment_card_id, account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(account_id) + " for Account on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(account_id).first();
			
			# assign the Account		
			payment_card.account = account
			
			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, payment_card_id ):
		err_msg = "Failed to unassign element " + str(payment_card_id) + " for Account on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# assign to None for unassignment
			payment_card.account = None			

			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignCustomer( self, payment_card_id, customer_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to assign element " + str(customer_id) + " for Customer on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customer_id).first();
			
			# assign the Customer		
			payment_card.customer = customer
			
			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, payment_card_id ):
		err_msg = "Failed to unassign element " + str(payment_card_id) + " for Customer on PaymentCard"

		try:
			# get the PaymentCard from db
			payment_card = self.get( payment_card_id ).first()	
			
			# assign to None for unassignment
			payment_card.customer = None			

			#save it
			payment_card.save()

			# reload and return the appropriate version					
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Exception:
			return None;
		
	def addTransactions( self, payment_card_id, transactions_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

		err_msg = "Failed to add elements " + str(transactions_ids) + " for Transactions on PaymentCard"

		try:
			# get the PaymentCard
			payment_card = self.get( payment_card_id ).first()
				
			# add the children by id
			payment_card.transactions.add(transactions_ids)
				
			# save it		
			payment_card.save()
			
			# reload and return the appropriate version
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Transaction does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeTransactions( self, payment_card_id, transactions_ids ):

		err_msg = "Failed to remove elements " + str(transactions_ids) + " for Transactions on PaymentCard"

		# lazy importing avoids circular dependenciesId
		try:
			# remove the children by id
			payment_card.transactions.remove(transactions_ids)

			# save it
			payment_card.save()

			# reload and return the appropriate version
			return self.get( payment_card_id );
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError("PaymentCard with id " + str(payment_card_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise Exceptions.ProcessingError("Transaction with id " + str(transactions_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
