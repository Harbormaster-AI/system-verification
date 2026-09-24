

from django.core import serializers
from django.db import utils

from bankingOnDjango.models.Collateral import Collateral
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Collateral
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CollateralDelegate Declaration
#======================================================================
class CollateralDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, collateral_id ):
		err_msg = "Failed to get Collateral from db using id " + str(collateral_id)
		try:	
			collateral = Collateral.objects.filter(id=collateral_id)
			return collateral.first();
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError("Collateral with id " + str(collateral_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, collateral):
		for model in serializers.deserialize("json", collateral):
			model.save()
			return model;

	def create(self, collateral):
		collateral.save()
		return collateral;

	def saveFromJson(self, collateral):
		for model in serializers.deserialize("json", collateral):
			model.save()
			return collateral;
	
	def save(self, collateral):
		collateral.save()
		return collateral;
	
	def delete(self, collateral_id ):
		err_msg = "Failed to delete Collateral from db using id " + str(collateral_id)
		
		try:
			collateral = Collateral.objects.get(id=collateral_id)
			collateral.delete()
			return True
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError("Collateral with id " + str(collateral_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Collateral.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all Collateral from db")
		except Exception:
			return None;
		
	def assignLoanAccount( self, collateral_id, loan_account_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import child_delegate

		err_msg = "Failed to assign element " + str(loan_account_id) + " for LoanAccount on Collateral"

		try:
			# get the Collateral from db
			collateral = self.get( collateral_id ).first()	
			
			# get the LoanAccount from db
			loan_account = child_delegate.get(loan_account_id).first();
			
			# assign the LoanAccount		
			collateral.loan_account = loan_account
			
			#save it
			collateral.save()

			# reload and return the appropriate version					
			return self.get( collateral_id );
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Collateral with id " + str(collateral_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, collateral_id ):
		err_msg = "Failed to unassign element " + str(collateral_id) + " for LoanAccount on Collateral"

		try:
			# get the Collateral from db
			collateral = self.get( collateral_id ).first()	
			
			# assign to None for unassignment
			collateral.loan_account = None			

			#save it
			collateral.save()

			# reload and return the appropriate version					
			return self.get( collateral_id );
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Collateral with id " + str(collateral_id) + " does not exist.")
		except Exception:
			return None;
		
