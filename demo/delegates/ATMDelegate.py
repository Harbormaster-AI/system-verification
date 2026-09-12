from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.ATM import ATM
from demo.models.Branch import Branch
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ATM
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ATMDelegate Declaration
#======================================================================
class ATMDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, aTMId ):
		try:	
			aTM = ATM.objects.filter(id=aTMId)
			return aTM.first();
		except ATM.DoesNotExist:
			raise ProcessingError("ATM with id " + str(aTMId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, aTM):
		for model in serializers.deserialize("json", aTM):
			model.save()
			return model;

	def create(self, aTM):
		aTM.save()
		return aTM;

	def saveFromJson(self, aTM):
		for model in serializers.deserialize("json", aTM):
			model.save()
			return aTM;
	
	def save(self, aTM):
		aTM.save()
		return aTM;
	
	def delete(self, aTMId ):
		errMsg = "Failed to delete ATM from db using id " + str(aTMId)
		
		try:
			aTM = ATM.objects.get(id=aTMId)
			aTM.delete()
			return True
		except ATM.DoesNotExist:
			raise ProcessingError("ATM with id " + str(aTMId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ATM.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ATM from db")
		except Exception:
			return None;
		
	def assignBranch( self, aTMId, branchId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BranchDelegate import BranchDelegate

		errMsg = "Failed to assign element " + str(branchId) + " for Branch on ATM"

		try:
			# get the ATM from db
			aTM = self.get( aTMId ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branchId).first();
			
			# assign the Branch		
			aTM.branch = branch
			
			#save it
			aTM.save()

			# reload and return the appropriate version					
			return self.get( aTMId );
		except ATM.DoesNotExist:
			raise ProcessingError(errMsg + " : ATM with id " + str(aTMId) + " does not exist.")
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, aTMId ):
		errMsg = "Failed to unassign element " + str(branchId) + " for Branch on ATM"

		try:
			# get the ATM from db
			aTM = self.get( aTMId ).first()	
			
			# assign to None for unassignment
			aTM.branch = None			

			#save it
			aTM.save()

			# reload and return the appropriate version					
			return self.get( aTMId );
		except ATM.DoesNotExist:
			raise ProcessingError(errMsg + " : ATM with id " + str(aTMId) + " does not exist.")
		except Exception:
			return None;
		
