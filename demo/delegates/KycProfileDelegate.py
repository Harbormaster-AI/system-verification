from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.KycProfile import KycProfile
from demo.models.Customer import Customer
from demo.models.IdentityDocument import IdentityDocument
from demo.models.RiskAssessment import RiskAssessment
from demo.models.ScreeningResult import ScreeningResult
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model KycProfile
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class KycProfileDelegate Declaration
#======================================================================
class KycProfileDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, kycProfileId ):
		try:	
			kycProfile = KycProfile.objects.filter(id=kycProfileId)
			return kycProfile.first();
		except KycProfile.DoesNotExist:
			raise ProcessingError("KycProfile with id " + str(kycProfileId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, kycProfile):
		for model in serializers.deserialize("json", kycProfile):
			model.save()
			return model;

	def create(self, kycProfile):
		kycProfile.save()
		return kycProfile;

	def saveFromJson(self, kycProfile):
		for model in serializers.deserialize("json", kycProfile):
			model.save()
			return kycProfile;
	
	def save(self, kycProfile):
		kycProfile.save()
		return kycProfile;
	
	def delete(self, kycProfileId ):
		errMsg = "Failed to delete KycProfile from db using id " + str(kycProfileId)
		
		try:
			kycProfile = KycProfile.objects.get(id=kycProfileId)
			kycProfile.delete()
			return True
		except KycProfile.DoesNotExist:
			raise ProcessingError("KycProfile with id " + str(kycProfileId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = KycProfile.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all KycProfile from db")
		except Exception:
			return None;
		
	def assignCustomer( self, kycProfileId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on KycProfile"

		try:
			# get the KycProfile from db
			kycProfile = self.get( kycProfileId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			kycProfile.customer = customer
			
			#save it
			kycProfile.save()

			# reload and return the appropriate version					
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, kycProfileId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on KycProfile"

		try:
			# get the KycProfile from db
			kycProfile = self.get( kycProfileId ).first()	
			
			# assign to None for unassignment
			kycProfile.customer = None			

			#save it
			kycProfile.save()

			# reload and return the appropriate version					
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Exception:
			return None;
		
	def addIdentityDocuments( self, kycProfileId, identityDocumentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

		errMsg = "Failed to add elements " + str(identityDocumentsIds) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = identityDocumentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IdentityDocument		
				identityDocument = IdentityDocumentDelegate().get(id).first();	
				# add the IdentityDocument
				kycProfile.identityDocuments.add(identityDocument)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except IdentityDocument.DoesNotExist:
			raise ProcessingError(errMsg + " : IdentityDocument does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeIdentityDocuments( self, kycProfileId, identityDocumentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

		errMsg = "Failed to remove elements " + str(identityDocumentsIds) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = identityDocumentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IdentityDocument		
				identityDocument = IdentityDocumentDelegate().get(id).first();	
				# add the IdentityDocument
				kycProfile.identityDocuments.remove(identityDocument)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except IdentityDocument.DoesNotExist:
			raise ProcessingError(errMsg + " : IdentityDocument does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addRiskAssessments( self, kycProfileId, riskAssessmentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

		errMsg = "Failed to add elements " + str(riskAssessmentsIds) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = riskAssessmentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the RiskAssessment		
				riskAssessment = RiskAssessmentDelegate().get(id).first();	
				# add the RiskAssessment
				kycProfile.riskAssessments.add(riskAssessment)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except RiskAssessment.DoesNotExist:
			raise ProcessingError(errMsg + " : RiskAssessment does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeRiskAssessments( self, kycProfileId, riskAssessmentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

		errMsg = "Failed to remove elements " + str(riskAssessmentsIds) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = riskAssessmentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the RiskAssessment		
				riskAssessment = RiskAssessmentDelegate().get(id).first();	
				# add the RiskAssessment
				kycProfile.riskAssessments.remove(riskAssessment)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except RiskAssessment.DoesNotExist:
			raise ProcessingError(errMsg + " : RiskAssessment does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addScreenings( self, kycProfileId, screeningsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ScreeningResultDelegate import ScreeningResultDelegate

		errMsg = "Failed to add elements " + str(screeningsIds) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = screeningsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ScreeningResult		
				screeningResult = ScreeningResultDelegate().get(id).first();	
				# add the ScreeningResult
				kycProfile.screenings.add(screeningResult)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(errMsg + " : ScreeningResult does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeScreenings( self, kycProfileId, screeningsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ScreeningResultDelegate import ScreeningResultDelegate

		errMsg = "Failed to remove elements " + str(screeningsIds) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kycProfile = self.get( kycProfileId ).first()
				
			# split on a comma with no spaces
			idList = screeningsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ScreeningResult		
				screeningResult = ScreeningResultDelegate().get(id).first();	
				# add the ScreeningResult
				kycProfile.screenings.remove(screeningResult)
				
			# save it		
			kycProfile.save()
			
			# reload and return the appropriate version
			return self.get( kycProfileId );
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except ScreeningResult.DoesNotExist:
			raise ProcessingError(errMsg + " : ScreeningResult does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
