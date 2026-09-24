

from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.ATM import ATM
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ATM
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMDelegate Declaration
#======================================================================
class ATMDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, a_t_m_id ):
		err_msg = "Failed to get ATM from db using id " + str(a_t_m_id)
		try:	
			a_t_m = ATM.objects.filter(id=a_t_m_id)
			return a_t_m.first();
		except ATM.DoesNotExist:
			raise Exceptions.ProcessingError("ATM with id " + str(a_t_m_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, a_t_m):
		for model in serializers.deserialize("json", a_t_m):
			model.save()
			return model;

	def create(self, a_t_m):
		a_t_m.save()
		return a_t_m;

	def saveFromJson(self, a_t_m):
		for model in serializers.deserialize("json", a_t_m):
			model.save()
			return a_t_m;
	
	def save(self, a_t_m):
		a_t_m.save()
		return a_t_m;
	
	def delete(self, a_t_m_id ):
		err_msg = "Failed to delete ATM from db using id " + str(a_t_m_id)
		
		try:
			a_t_m = ATM.objects.get(id=a_t_m_id)
			a_t_m.delete()
			return True
		except ATM.DoesNotExist:
			raise Exceptions.ProcessingError("ATM with id " + str(a_t_m_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = ATM.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all ATM from db")
		except Exception:
			return None;
		
	def assignBranch( self, a_t_m_id, branchId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

		err_msg = "Failed to assign element " + str(branchId) + " for Branch on ATM"

		try:
			# get the ATM from db
			a_t_m = self.get( a_t_m_id ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branchId).first();
			
			# assign the Branch		
			a_t_m.branch = branch
			
			#save it
			a_t_m.save()

			# reload and return the appropriate version					
			return self.get( a_t_m_id );
		except ATM.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ATM with id " + str(a_t_m_id) + " does not exist.")
		except Branch.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Branch with id " + str(branchId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, a_t_m_id ):
		err_msg = "Failed to unassign element " + str(branchId) + " for Branch on ATM"

		try:
			# get the ATM from db
			a_t_m = self.get( a_t_m_id ).first()	
			
			# assign to None for unassignment
			a_t_m.branch = None			

			#save it
			a_t_m.save()

			# reload and return the appropriate version					
			return self.get( a_t_m_id );
		except ATM.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ATM with id " + str(a_t_m_id) + " does not exist.")
		except Exception:
			return None;
		
