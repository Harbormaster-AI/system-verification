from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.RiskAssessment import RiskAssessment
from demo.models.KycProfile import KycProfile
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model RiskAssessment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RiskAssessmentDelegate Declaration
#======================================================================
class RiskAssessmentDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, riskAssessmentId ):
		try:	
			riskAssessment = RiskAssessment.objects.filter(id=riskAssessmentId)
			return riskAssessment.first();
		except RiskAssessment.DoesNotExist:
			raise ProcessingError("RiskAssessment with id " + str(riskAssessmentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, riskAssessment):
		for model in serializers.deserialize("json", riskAssessment):
			model.save()
			return model;

	def create(self, riskAssessment):
		riskAssessment.save()
		return riskAssessment;

	def saveFromJson(self, riskAssessment):
		for model in serializers.deserialize("json", riskAssessment):
			model.save()
			return riskAssessment;
	
	def save(self, riskAssessment):
		riskAssessment.save()
		return riskAssessment;
	
	def delete(self, riskAssessmentId ):
		errMsg = "Failed to delete RiskAssessment from db using id " + str(riskAssessmentId)
		
		try:
			riskAssessment = RiskAssessment.objects.get(id=riskAssessmentId)
			riskAssessment.delete()
			return True
		except RiskAssessment.DoesNotExist:
			raise ProcessingError("RiskAssessment with id " + str(riskAssessmentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = RiskAssessment.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all RiskAssessment from db")
		except Exception:
			return None;
		
	def assignKycProfile( self, riskAssessmentId, kycProfileId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.KycProfileDelegate import KycProfileDelegate

		errMsg = "Failed to assign element " + str(kycProfileId) + " for KycProfile on RiskAssessment"

		try:
			# get the RiskAssessment from db
			riskAssessment = self.get( riskAssessmentId ).first()	
			
			# get the KycProfile from db
			kycProfile = KycProfileDelegate().get(kycProfileId).first();
			
			# assign the KycProfile		
			riskAssessment.kycProfile = kycProfile
			
			#save it
			riskAssessment.save()

			# reload and return the appropriate version					
			return self.get( riskAssessmentId );
		except RiskAssessment.DoesNotExist:
			raise ProcessingError(errMsg + " : RiskAssessment with id " + str(riskAssessmentId) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignKycProfile( self, riskAssessmentId ):
		errMsg = "Failed to unassign element " + str(kycProfileId) + " for KycProfile on RiskAssessment"

		try:
			# get the RiskAssessment from db
			riskAssessment = self.get( riskAssessmentId ).first()	
			
			# assign to None for unassignment
			riskAssessment.kycProfile = None			

			#save it
			riskAssessment.save()

			# reload and return the appropriate version					
			return self.get( riskAssessmentId );
		except RiskAssessment.DoesNotExist:
			raise ProcessingError(errMsg + " : RiskAssessment with id " + str(riskAssessmentId) + " does not exist.")
		except Exception:
			return None;
		
