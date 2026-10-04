

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.FXTrade import FXTrade
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.ExchangeRate import ExchangeRate
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.Transaction import Transaction
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FXTrade
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FXTradeDelegate Declaration
#======================================================================
class FXTradeDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, f_x_trade_id ):
		err_msg = "Failed to get FXTrade from db using id " + str(f_x_trade_id)
		try:	
			f_x_trade = FXTrade.objects.filter(id=f_x_trade_id)
			return f_x_trade.first();
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError("FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, f_x_trade):
		for model in serializers.deserialize("json", f_x_trade):
			model.save()
			return model;

	def create(self, f_x_trade):
		f_x_trade.save()
		return f_x_trade;

	def saveFromJson(self, f_x_trade):
		for model in serializers.deserialize("json", f_x_trade):
			model.save()
			return f_x_trade;
	
	def save(self, f_x_trade):
		f_x_trade.save()
		return f_x_trade;
	
	def delete(self, f_x_trade_id ):
		err_msg = "Failed to delete FXTrade from db using id " + str(f_x_trade_id)
		
		try:
			f_x_trade = FXTrade.objects.get(id=f_x_trade_id)
			f_x_trade.delete()
			return True
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError("FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = FXTrade.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all FXTrade from db")
		except Exception:
			return None;
		
	def assignCustomer( self, f_x_trade_id, customer_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import child_delegate

		err_msg = "Failed to assign element " + str(customer_id) + " for Customer on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the Customer from db
			customer = child_delegate.get(customer_id).first();
			
			# assign the Customer		
			f_x_trade.customer = customer
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for Customer on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.customer = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignBank( self, f_x_trade_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import child_delegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the Bank from db
			bank = child_delegate.get(bank_id).first();
			
			# assign the Bank		
			f_x_trade.bank = bank
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for Bank on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.bank = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignExchangeRate( self, f_x_trade_id, exchange_rate_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExchangeRateDelegate import child_delegate

		err_msg = "Failed to assign element " + str(exchange_rate_id) + " for ExchangeRate on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the ExchangeRate from db
			exchange_rate = child_delegate.get(exchange_rate_id).first();
			
			# assign the ExchangeRate		
			f_x_trade.exchange_rate = exchange_rate
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except ExchangeRate.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ExchangeRate with id " + str(exchange_rate_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignExchangeRate( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for ExchangeRate on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.exchange_rate = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignSourceAccount( self, f_x_trade_id, source_account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import child_delegate

		err_msg = "Failed to assign element " + str(source_account_id) + " for SourceAccount on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the Account from db
			account = child_delegate.get(source_account_id).first();
			
			# assign the SourceAccount		
			f_x_trade.source_account = account
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(source_account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSourceAccount( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for SourceAccount on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.account = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignDestinationAccount( self, f_x_trade_id, destination_account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import child_delegate

		err_msg = "Failed to assign element " + str(destination_account_id) + " for DestinationAccount on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the Account from db
			account = child_delegate.get(destination_account_id).first();
			
			# assign the DestinationAccount		
			f_x_trade.destination_account = account
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(destination_account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDestinationAccount( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for DestinationAccount on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.account = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignTransaction( self, f_x_trade_id, transaction_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.TransactionDelegate import child_delegate

		err_msg = "Failed to assign element " + str(transaction_id) + " for Transaction on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# get the Transaction from db
			transaction = child_delegate.get(transaction_id).first();
			
			# assign the Transaction		
			f_x_trade.transaction = transaction
			
			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Transaction.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Transaction with id " + str(transaction_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTransaction( self, f_x_trade_id ):
		err_msg = "Failed to unassign element " + str(f_x_trade_id) + " for Transaction on FXTrade"

		try:
			# get the FXTrade from db
			f_x_trade = self.get( f_x_trade_id ).first()	
			
			# assign to None for unassignment
			f_x_trade.transaction = None			

			#save it
			f_x_trade.save()

			# reload and return the appropriate version					
			return self.get( f_x_trade_id );
		except FXTrade.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FXTrade with id " + str(f_x_trade_id) + " does not exist.")
		except Exception:
			return None;
		
