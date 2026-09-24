

from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.FeeCharge import FeeCharge
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FeeCharge
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FeeChargeDelegate Declaration
#======================================================================
class FeeChargeDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, fee_charge_id ):
		err_msg = "Failed to get FeeCharge from db using id " + str(fee_charge_id)
		try:	
			fee_charge = FeeCharge.objects.filter(id=fee_charge_id)
			return fee_charge.first();
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError("FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, fee_charge):
		for model in serializers.deserialize("json", fee_charge):
			model.save()
			return model;

	def create(self, fee_charge):
		fee_charge.save()
		return fee_charge;

	def saveFromJson(self, fee_charge):
		for model in serializers.deserialize("json", fee_charge):
			model.save()
			return fee_charge;
	
	def save(self, fee_charge):
		fee_charge.save()
		return fee_charge;
	
	def delete(self, fee_charge_id ):
		err_msg = "Failed to delete FeeCharge from db using id " + str(fee_charge_id)
		
		try:
			fee_charge = FeeCharge.objects.get(id=fee_charge_id)
			fee_charge.delete()
			return True
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError("FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = FeeCharge.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all FeeCharge from db")
		except Exception:
			return None;
		
	def assignAccount( self, fee_charge_id, account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(account_id) + " for Account on FeeCharge"

		try:
			# get the FeeCharge from db
			fee_charge = self.get( fee_charge_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(account_id).first();
			
			# assign the Account		
			fee_charge.account = account
			
			#save it
			fee_charge.save()

			# reload and return the appropriate version					
			return self.get( fee_charge_id );
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account with id " + str(account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, fee_charge_id ):
		err_msg = "Failed to unassign element " + str(fee_charge_id) + " for Account on FeeCharge"

		try:
			# get the FeeCharge from db
			fee_charge = self.get( fee_charge_id ).first()	
			
			# assign to None for unassignment
			fee_charge.account = None			

			#save it
			fee_charge.save()

			# reload and return the appropriate version					
			return self.get( fee_charge_id );
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignLoanAccount( self, fee_charge_id, loan_account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to assign element " + str(loan_account_id) + " for LoanAccount on FeeCharge"

		try:
			# get the FeeCharge from db
			fee_charge = self.get( fee_charge_id ).first()	
			
			# get the LoanAccount from db
			loan_account = LoanAccountDelegate().get(loan_account_id).first();
			
			# assign the LoanAccount		
			fee_charge.loan_account = loan_account
			
			#save it
			fee_charge.save()

			# reload and return the appropriate version					
			return self.get( fee_charge_id );
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, fee_charge_id ):
		err_msg = "Failed to unassign element " + str(fee_charge_id) + " for LoanAccount on FeeCharge"

		try:
			# get the FeeCharge from db
			fee_charge = self.get( fee_charge_id ).first()	
			
			# assign to None for unassignment
			fee_charge.loan_account = None			

			#save it
			fee_charge.save()

			# reload and return the appropriate version					
			return self.get( fee_charge_id );
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge with id " + str(fee_charge_id) + " does not exist.")
		except Exception:
			return None;
		
