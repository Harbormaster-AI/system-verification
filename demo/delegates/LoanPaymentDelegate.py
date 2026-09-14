from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.LoanPayment import LoanPayment
from demo.models.LoanAccount import LoanAccount
from demo.models.Transaction import Transaction
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model LoanPayment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanPaymentDelegate Declaration
#======================================================================
class LoanPaymentDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, loanPaymentId ):
		try:	
			loanPayment = LoanPayment.objects.filter(id=loanPaymentId)
			return loanPayment.first();
		except LoanPayment.DoesNotExist:
			raise ProcessingError("LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, loanPayment):
		for model in serializers.deserialize("json", loanPayment):
			model.save()
			return model;

	def create(self, loanPayment):
		loanPayment.save()
		return loanPayment;

	def saveFromJson(self, loanPayment):
		for model in serializers.deserialize("json", loanPayment):
			model.save()
			return loanPayment;
	
	def save(self, loanPayment):
		loanPayment.save()
		return loanPayment;
	
	def delete(self, loanPaymentId ):
		errMsg = "Failed to delete LoanPayment from db using id " + str(loanPaymentId)
		
		try:
			loanPayment = LoanPayment.objects.get(id=loanPaymentId)
			loanPayment.delete()
			return True
		except LoanPayment.DoesNotExist:
			raise ProcessingError("LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = LoanPayment.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all LoanPayment from db")
		except Exception:
			return None;
		
	def assignLoanAccount( self, loanPaymentId, loanAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to assign element " + str(loanAccountId) + " for LoanAccount on LoanPayment"

		try:
			# get the LoanPayment from db
			loanPayment = self.get( loanPaymentId ).first()	
			
			# get the LoanAccount from db
			loanAccount = LoanAccountDelegate().get(loanAccountId).first();
			
			# assign the LoanAccount		
			loanPayment.loanAccount = loanAccount
			
			#save it
			loanPayment.save()

			# reload and return the appropriate version					
			return self.get( loanPaymentId );
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, loanPaymentId ):
		errMsg = "Failed to unassign element " + str(loanAccountId) + " for LoanAccount on LoanPayment"

		try:
			# get the LoanPayment from db
			loanPayment = self.get( loanPaymentId ).first()	
			
			# assign to None for unassignment
			loanPayment.loanAccount = None			

			#save it
			loanPayment.save()

			# reload and return the appropriate version					
			return self.get( loanPaymentId );
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTransaction( self, loanPaymentId, transactionId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.TransactionDelegate import TransactionDelegate

		errMsg = "Failed to assign element " + str(transactionId) + " for Transaction on LoanPayment"

		try:
			# get the LoanPayment from db
			loanPayment = self.get( loanPaymentId ).first()	
			
			# get the Transaction from db
			transaction = TransactionDelegate().get(transactionId).first();
			
			# assign the Transaction		
			loanPayment.transaction = transaction
			
			#save it
			loanPayment.save()

			# reload and return the appropriate version					
			return self.get( loanPaymentId );
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except Transaction.DoesNotExist:
			raise ProcessingError(errMsg + " : Transaction with id " + str(transactionId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTransaction( self, loanPaymentId ):
		errMsg = "Failed to unassign element " + str(transactionId) + " for Transaction on LoanPayment"

		try:
			# get the LoanPayment from db
			loanPayment = self.get( loanPaymentId ).first()	
			
			# assign to None for unassignment
			loanPayment.transaction = None			

			#save it
			loanPayment.save()

			# reload and return the appropriate version					
			return self.get( loanPaymentId );
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment with id " + str(loanPaymentId) + " does not exist.")
		except Exception:
			return None;
		
