
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.ScreeningResult import ScreeningResult
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ScreeningResult
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ScreeningResultDelegate Declaration
#======================================================================
class ScreeningResultDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, screening_result_id ):
		try:	
			screening_result = ScreeningResult.objects.filter(id=screening_result_id)
			return screening_result.first();
		except ScreeningResult.DoesNotExist:
			raise ProcessingError("ScreeningResult with id " + str(screening_result_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 

	def createFromJson(self, screening_result):
		for model in serializers.deserialize("json", screening_result):
			model.save()
			return model;

	def create(self, screening_result):
		screening_result.save()
		return screening_result;

	def saveFromJson(self, screening_result):
		for model in serializers.deserialize("json", screening_result):
			model.save()
			return screening_result;
	
	def save(self, screening_result):
		screening_result.save()
		return screening_result;
	
	def delete(self, screening_result_id ):
		err_msg = "Failed to delete ScreeningResult from db using id " + str(screening_result_id)
		
		try:
			screening_result = ScreeningResult.objects.get(id=screening_result_id)
			screening_result.delete()
			return True
		except ScreeningResult.DoesNotExist:
			raise ProcessingError("ScreeningResult with id " + str(screening_result_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = ScreeningResult.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ScreeningResult from db")
		except Exception:
			return None;
		
	def assignKycProfile( self, screening_result_id, kycProfileId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

		err_msg = "Failed to assign element " + str(kycProfileId) + " for KycProfile on ScreeningResult"

		try:
			# get the ScreeningResult from db
			screening_result = self.get( screening_result_id ).first()	
			
			# get the KycProfile from db
			kycProfile = KycProfileDelegate().get(kycProfileId).first();
			
			# assign the KycProfile		
			screening_result.kycProfile = kycProfile
			
			#save it
			screening_result.save()

			# reload and return the appropriate version					
			return self.get( screening_result_id );
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(err_msg + " : ScreeningResult with id " + str(screening_result_id) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(err_msg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignKycProfile( self, screening_result_id ):
		err_msg = "Failed to unassign element " + str(kycProfileId) + " for KycProfile on ScreeningResult"

		try:
			# get the ScreeningResult from db
			screening_result = self.get( screening_result_id ).first()	
			
			# assign to None for unassignment
			screening_result.kycProfile = None			

			#save it
			screening_result.save()

			# reload and return the appropriate version					
			return self.get( screening_result_id );
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(err_msg + " : ScreeningResult with id " + str(screening_result_id) + " does not exist.")
		except Exception:
			return None;
		
