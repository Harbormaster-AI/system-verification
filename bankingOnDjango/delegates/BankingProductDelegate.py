

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model BankingProduct
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankingProductDelegate Declaration
#======================================================================
class BankingProductDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, banking_product_id ):
		err_msg = "Failed to get BankingProduct from db using id " + str(banking_product_id)
		try:	
			banking_product = BankingProduct.objects.filter(id=banking_product_id)
			return banking_product.first();
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError("BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, banking_product):
		for model in serializers.deserialize("json", banking_product):
			model.save()
			return model;

	def create(self, banking_product):
		banking_product.save()
		return banking_product;

	def saveFromJson(self, banking_product):
		for model in serializers.deserialize("json", banking_product):
			model.save()
			return banking_product;
	
	def save(self, banking_product):
		banking_product.save()
		return banking_product;
	
	def delete(self, banking_product_id ):
		err_msg = "Failed to delete BankingProduct from db using id " + str(banking_product_id)
		
		try:
			banking_product = BankingProduct.objects.get(id=banking_product_id)
			banking_product.delete()
			return True
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError("BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = BankingProduct.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all BankingProduct from db")
		except Exception:
			return None;
		
	def assignBank( self, banking_product_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on BankingProduct"

		try:
			# get the BankingProduct from db
			banking_product = self.get( banking_product_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bank_id).first();
			
			# assign the Bank		
			banking_product.bank = bank
			
			#save it
			banking_product.save()

			# reload and return the appropriate version					
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, banking_product_id ):
		err_msg = "Failed to unassign element " + str(banking_product_id) + " for Bank on BankingProduct"

		try:
			# get the BankingProduct from db
			banking_product = self.get( banking_product_id ).first()	
			
			# assign to None for unassignment
			banking_product.bank = None			

			#save it
			banking_product.save()

			# reload and return the appropriate version					
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, banking_product_id, accounts_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to add elements " + str(accounts_ids) + " for Accounts on BankingProduct"

		try:
			# get the BankingProduct
			banking_product = self.get( banking_product_id ).first()
				
			# add the children ids
			banking_product.accounts.add(accounts_ids)
				
			# save it		
			banking_product.save()
			
			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeAccounts( self, banking_product_id, accounts_ids ):

		err_msg = "Failed to remove elements " + str(accounts_ids) + " for Accounts on BankingProduct"

		# lazy importing avoids circular dependenciesId
		try:
			banking_product.accounts.remove(accounts_ids)

			# save it
			banking_product.save()

			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError("BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError("Account with id " + str(accounts_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addLoanAccounts( self, banking_product_id, loan_accounts_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to add elements " + str(loan_accounts_ids) + " for LoanAccounts on BankingProduct"

		try:
			# get the BankingProduct
			banking_product = self.get( banking_product_id ).first()
				
			# add the children ids
			banking_product.loan_accounts.add(loan_accounts_ids)
				
			# save it		
			banking_product.save()
			
			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeLoanAccounts( self, banking_product_id, loan_accounts_ids ):

		err_msg = "Failed to remove elements " + str(loan_accounts_ids) + " for LoanAccounts on BankingProduct"

		# lazy importing avoids circular dependenciesId
		try:
			banking_product.loan_accounts.remove(loan_accounts_ids)

			# save it
			banking_product.save()

			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError("BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_accounts_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addPaymentCards( self, banking_product_id, payment_cards_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to add elements " + str(payment_cards_ids) + " for PaymentCards on BankingProduct"

		try:
			# get the BankingProduct
			banking_product = self.get( banking_product_id ).first()
				
			# add the children ids
			banking_product.payment_cards.add(payment_cards_ids)
				
			# save it		
			banking_product.save()
			
			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removePaymentCards( self, banking_product_id, payment_cards_ids ):

		err_msg = "Failed to remove elements " + str(payment_cards_ids) + " for PaymentCards on BankingProduct"

		# lazy importing avoids circular dependenciesId
		try:
			banking_product.payment_cards.remove(payment_cards_ids)

			# save it
			banking_product.save()

			# reload and return the appropriate version
			return self.get( banking_product_id );
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError("BankingProduct with id " + str(banking_product_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError("PaymentCard with id " + str(payment_cards_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
