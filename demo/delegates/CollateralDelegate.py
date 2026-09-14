from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Collateral import Collateral
from demo.models.LoanAccount import LoanAccount
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Collateral
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CollateralDelegate Declaration
#======================================================================
class CollateralDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, collateralId ):
		try:	
			collateral = Collateral.objects.filter(id=collateralId)
			return collateral.first();
		except Collateral.DoesNotExist:
			raise ProcessingError("Collateral with id " + str(collateralId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

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
	
	def delete(self, collateralId ):
		errMsg = "Failed to delete Collateral from db using id " + str(collateralId)
		
		try:
			collateral = Collateral.objects.get(id=collateralId)
			collateral.delete()
			return True
		except Collateral.DoesNotExist:
			raise ProcessingError("Collateral with id " + str(collateralId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Collateral.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Collateral from db")
		except Exception:
			return None;
		
	def assignLoanAccount( self, collateralId, loanAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to assign element " + str(loanAccountId) + " for LoanAccount on Collateral"

		try:
			# get the Collateral from db
			collateral = self.get( collateralId ).first()	
			
			# get the LoanAccount from db
			loanAccount = LoanAccountDelegate().get(loanAccountId).first();
			
			# assign the LoanAccount		
			collateral.loanAccount = loanAccount
			
			#save it
			collateral.save()

			# reload and return the appropriate version					
			return self.get( collateralId );
		except Collateral.DoesNotExist:
			raise ProcessingError(errMsg + " : Collateral with id " + str(collateralId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, collateralId ):
		errMsg = "Failed to unassign element " + str(loanAccountId) + " for LoanAccount on Collateral"

		try:
			# get the Collateral from db
			collateral = self.get( collateralId ).first()	
			
			# assign to None for unassignment
			collateral.loanAccount = None			

			#save it
			collateral.save()

			# reload and return the appropriate version					
			return self.get( collateralId );
		except Collateral.DoesNotExist:
			raise ProcessingError(errMsg + " : Collateral with id " + str(collateralId) + " does not exist.")
		except Exception:
			return None;
		
