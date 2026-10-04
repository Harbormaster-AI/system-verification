

from django.core import serializers
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
		
	def assignCustomer( self, kyc_profile_id, customer_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import child_delegate

		err_msg = "Failed to assign element " + str(customer_id) + " for Customer on KycProfile"

		try:
			# get the KycProfile from db
			kyc_profile = self.get( kyc_profile_id ).first()	
			
			# get the Customer from db
			customer = child_delegate.get(customer_id).first();
			
			# assign the Customer		
			kyc_profile.customer = customer
			
			#save it
			kyc_profile.save()

			# reload and return the appropriate version					
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, kyc_profile_id ):
		err_msg = "Failed to unassign element " + str(kyc_profile_id) + " for Customer on KycProfile"

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
		
	def addIdentityDocuments( self, kyc_profile_id, identity_documents_ids ):

		err_msg = "Failed to add elements " + str(identity_documents_ids) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# add the children by id
			kyc_profile.identity_documents.add(identity_documents_ids)
				
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
		
	def removeIdentityDocuments( self, kyc_profile_id, identity_documents_ids ):

		err_msg = "Failed to remove elements " + str(identity_documents_ids) + " for IdentityDocuments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()

			# remove the children by id
			kyc_profile.identity_documents.remove(identity_documents_ids)

			# save it
			kyc_profile.save()

			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError("KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except IdentityDocument.DoesNotExist:
			raise Exceptions.ProcessingError("IdentityDocument with id " + str(identity_documents_ids) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addRiskAssessments( self, kyc_profile_id, risk_assessments_ids ):

		err_msg = "Failed to add elements " + str(risk_assessments_ids) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# add the children by id
			kyc_profile.risk_assessments.add(risk_assessments_ids)
				
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
		
	def removeRiskAssessments( self, kyc_profile_id, risk_assessments_ids ):

		err_msg = "Failed to remove elements " + str(risk_assessments_ids) + " for RiskAssessments on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()

			# remove the children by id
			kyc_profile.risk_assessments.remove(risk_assessments_ids)

			# save it
			kyc_profile.save()

			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError("KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except RiskAssessment.DoesNotExist:
			raise Exceptions.ProcessingError("RiskAssessment with id " + str(risk_assessments_ids) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addScreenings( self, kyc_profile_id, screenings_ids ):

		err_msg = "Failed to add elements " + str(screenings_ids) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()
				
			# add the children by id
			kyc_profile.screenings.add(screenings_ids)
				
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
		
	def removeScreenings( self, kyc_profile_id, screenings_ids ):

		err_msg = "Failed to remove elements " + str(screenings_ids) + " for Screenings on KycProfile"

		try:
			# get the KycProfile
			kyc_profile = self.get( kyc_profile_id ).first()

			# remove the children by id
			kyc_profile.screenings.remove(screenings_ids)

			# save it
			kyc_profile.save()

			# reload and return the appropriate version
			return self.get( kyc_profile_id );
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError("KycProfile with id " + str(kyc_profile_id) + " does not exist.")
		except ScreeningResult.DoesNotExist:
			raise Exceptions.ProcessingError("ScreeningResult with id " + str(screenings_ids) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
