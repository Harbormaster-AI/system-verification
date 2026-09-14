from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.FeeCharge import FeeCharge
from demo.models.Account import Account
from demo.models.LoanAccount import LoanAccount
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FeeCharge
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FeeChargeDelegate Declaration
#======================================================================
class FeeChargeDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, feeChargeId ):
		try:	
			feeCharge = FeeCharge.objects.filter(id=feeChargeId)
			return feeCharge.first();
		except FeeCharge.DoesNotExist:
			raise ProcessingError("FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, feeCharge):
		for model in serializers.deserialize("json", feeCharge):
			model.save()
			return model;

	def create(self, feeCharge):
		feeCharge.save()
		return feeCharge;

	def saveFromJson(self, feeCharge):
		for model in serializers.deserialize("json", feeCharge):
			model.save()
			return feeCharge;
	
	def save(self, feeCharge):
		feeCharge.save()
		return feeCharge;
	
	def delete(self, feeChargeId ):
		errMsg = "Failed to delete FeeCharge from db using id " + str(feeChargeId)
		
		try:
			feeCharge = FeeCharge.objects.get(id=feeChargeId)
			feeCharge.delete()
			return True
		except FeeCharge.DoesNotExist:
			raise ProcessingError("FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = FeeCharge.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all FeeCharge from db")
		except Exception:
			return None;
		
	def assignAccount( self, feeChargeId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on FeeCharge"

		try:
			# get the FeeCharge from db
			feeCharge = self.get( feeChargeId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			feeCharge.account = account
			
			#save it
			feeCharge.save()

			# reload and return the appropriate version					
			return self.get( feeChargeId );
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, feeChargeId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on FeeCharge"

		try:
			# get the FeeCharge from db
			feeCharge = self.get( feeChargeId ).first()	
			
			# assign to None for unassignment
			feeCharge.account = None			

			#save it
			feeCharge.save()

			# reload and return the appropriate version					
			return self.get( feeChargeId );
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except Exception:
			return None;
		
	def assignLoanAccount( self, feeChargeId, loanAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to assign element " + str(loanAccountId) + " for LoanAccount on FeeCharge"

		try:
			# get the FeeCharge from db
			feeCharge = self.get( feeChargeId ).first()	
			
			# get the LoanAccount from db
			loanAccount = LoanAccountDelegate().get(loanAccountId).first();
			
			# assign the LoanAccount		
			feeCharge.loanAccount = loanAccount
			
			#save it
			feeCharge.save()

			# reload and return the appropriate version					
			return self.get( feeChargeId );
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, feeChargeId ):
		errMsg = "Failed to unassign element " + str(loanAccountId) + " for LoanAccount on FeeCharge"

		try:
			# get the FeeCharge from db
			feeCharge = self.get( feeChargeId ).first()	
			
			# assign to None for unassignment
			feeCharge.loanAccount = None			

			#save it
			feeCharge.save()

			# reload and return the appropriate version					
			return self.get( feeChargeId );
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge with id " + str(feeChargeId) + " does not exist.")
		except Exception:
			return None;
		
