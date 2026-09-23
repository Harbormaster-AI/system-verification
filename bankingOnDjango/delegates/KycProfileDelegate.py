

from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.IdentityDocument import IdentityDocument
from bankingOnDjango.models.RiskAssessment import RiskAssessment
from bankingOnDjango.models.ScreeningResult import ScreeningResult
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model KycProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class KycProfileDelegate Declaration
#======================================================================
class KycProfileDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, kyc_profile_id ):
		err_msg = "Failed to get KycProfile from db using id " + str(kyc_profile_id)
		try:	
			kyc_profile = KycProfile.objects.filter(id=kyc_profile_id)
			return kyc_profile.first();
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError("KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, kyc_profile):
		for model in serializers.deserialize("json", kyc_profile):
			model.save()
			return model;

	def create(self, kyc_profile):
		kyc_profile.save()
		return kyc_profile;

	def saveFromJson(self, kyc_profile):
		for model in serializers.deserialize("json", kyc_profile):
			model.save()
			return kyc_profile;
	
	def save(self, kyc_profile):
		kyc_profile.save()
		return kyc_profile;
	
	def delete(self, kyc_profile_id ):
		err_msg = "Failed to delete KycProfile from db using id " + str(kyc_profile_id)
		
		try:
			kyc_profile = KycProfile.objects.get(id=kyc_profile_id)
			kyc_profile.delete()
			return True
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError("KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = KycProfile.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all KycProfile from db")
		except Exception:
			return None;
		
	def assignCustomer( self, kyc_profile_id, customerId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to assign element " + str(customerId) + " for Customer on KycProfile"

		try:
			# get the KycProfile from db
			kyc_profile = self.get( kyc_profile_id ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			kyc_profile.customer = customer
			
			#save it
			kyc_profile.save()

			# reload and return the appropriate version					
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, kyc_profile_id ):
		err_msg = "Failed to unassign element " + str(customerId) + " for Customer on KycProfile"

		try:
			# get the KycProfile from db
			kyc_profile = self.get( kyc_profile_id ).first()	
			
			# assign to None for unassignment
			kyc_profile.customer = None			

			#save it
			kyc_profile.save()

			# reload and return the appropriate version					
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except Exception:
			return None;
		
	def addIdentityDocuments( self, kyc_profile_id, identityDocumentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

		err_msg = "Failed to add elements " + str(identityDocumentsIds) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in identityDocumentsIds:
				# read the IdentityDocument		
				identityDocument = IdentityDocumentDelegate().get(id).first();	
				# add the IdentityDocument
				kyc_profile.identityDocuments.add(identityDocument)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except IdentityDocument.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : IdentityDocument does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeIdentityDocuments( self, kyc_profile_id, identityDocumentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

		err_msg = "Failed to remove elements " + str(identityDocumentsIds) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in identityDocumentsIds:
				# read the IdentityDocument		
				identityDocument = IdentityDocumentDelegate().get(id).first();	
				# add the IdentityDocument
				kyc_profile.identityDocuments.remove(identityDocument)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except IdentityDocument.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : IdentityDocument does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addRiskAssessments( self, kyc_profile_id, riskAssessmentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

		err_msg = "Failed to add elements " + str(riskAssessmentsIds) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in riskAssessmentsIds:
				# read the RiskAssessment		
				riskAssessment = RiskAssessmentDelegate().get(id).first();	
				# add the RiskAssessment
				kyc_profile.riskAssessments.add(riskAssessment)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except RiskAssessment.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : RiskAssessment does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeRiskAssessments( self, kyc_profile_id, riskAssessmentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

		err_msg = "Failed to remove elements " + str(riskAssessmentsIds) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in riskAssessmentsIds:
				# read the RiskAssessment		
				riskAssessment = RiskAssessmentDelegate().get(id).first();	
				# add the RiskAssessment
				kyc_profile.riskAssessments.remove(riskAssessment)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except RiskAssessment.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : RiskAssessment does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addScreenings( self, kyc_profile_id, screeningsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ScreeningResultDelegate import ScreeningResultDelegate

		err_msg = "Failed to add elements " + str(screeningsIds) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in screeningsIds:
				# read the ScreeningResult		
				screeningResult = ScreeningResultDelegate().get(id).first();	
				# add the ScreeningResult
				kyc_profile.screenings.add(screeningResult)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except ScreeningResult.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ScreeningResult does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeScreenings( self, kyc_profile_id, screeningsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ScreeningResultDelegate import ScreeningResultDelegate

		err_msg = "Failed to remove elements " + str(screeningsIds) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# iterate over ids
			for id in screeningsIds:
				# read the ScreeningResult		
				screeningResult = ScreeningResultDelegate().get(id).first();	
				# add the ScreeningResult
				kyc_profile.screenings.remove(screeningResult)
				
			# save it		
			kyc_profile.save()
			
			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except ScreeningResult.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ScreeningResult does not exist.")
		except utils.Exceptions.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
