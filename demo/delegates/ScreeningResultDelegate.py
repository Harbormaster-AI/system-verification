from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.ScreeningResult import ScreeningResult
from demo.models.KycProfile import KycProfile
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ScreeningResult
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ScreeningResultDelegate Declaration
#======================================================================
class ScreeningResultDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, screeningResultId ):
		try:	
			screeningResult = ScreeningResult.objects.filter(id=screeningResultId)
			return screeningResult.first();
		except ScreeningResult.DoesNotExist:
			raise ProcessingError("ScreeningResult with id " + str(screeningResultId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, screeningResult):
		for model in serializers.deserialize("json", screeningResult):
			model.save()
			return model;

	def create(self, screeningResult):
		screeningResult.save()
		return screeningResult;

	def saveFromJson(self, screeningResult):
		for model in serializers.deserialize("json", screeningResult):
			model.save()
			return screeningResult;
	
	def save(self, screeningResult):
		screeningResult.save()
		return screeningResult;
	
	def delete(self, screeningResultId ):
		errMsg = "Failed to delete ScreeningResult from db using id " + str(screeningResultId)
		
		try:
			screeningResult = ScreeningResult.objects.get(id=screeningResultId)
			screeningResult.delete()
			return True
		except ScreeningResult.DoesNotExist:
			raise ProcessingError("ScreeningResult with id " + str(screeningResultId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ScreeningResult.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ScreeningResult from db")
		except Exception:
			return None;
		
	def assignKycProfile( self, screeningResultId, kycProfileId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.KycProfileDelegate import KycProfileDelegate

		errMsg = "Failed to assign element " + str(kycProfileId) + " for KycProfile on ScreeningResult"

		try:
			# get the ScreeningResult from db
			screeningResult = self.get( screeningResultId ).first()	
			
			# get the KycProfile from db
			kycProfile = KycProfileDelegate().get(kycProfileId).first();
			
			# assign the KycProfile		
			screeningResult.kycProfile = kycProfile
			
			#save it
			screeningResult.save()

			# reload and return the appropriate version					
			return self.get( screeningResultId );
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(errMsg + " : ScreeningResult with id " + str(screeningResultId) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignKycProfile( self, screeningResultId ):
		errMsg = "Failed to unassign element " + str(kycProfileId) + " for KycProfile on ScreeningResult"

		try:
			# get the ScreeningResult from db
			screeningResult = self.get( screeningResultId ).first()	
			
			# assign to None for unassignment
			screeningResult.kycProfile = None			

			#save it
			screeningResult.save()

			# reload and return the appropriate version					
			return self.get( screeningResultId );
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(errMsg + " : ScreeningResult with id " + str(screeningResultId) + " does not exist.")
		except Exception:
			return None;
		
