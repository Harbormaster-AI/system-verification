from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.IdentityDocument import IdentityDocument
from demo.models.KycProfile import KycProfile
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model IdentityDocument
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class IdentityDocumentDelegate Declaration
#======================================================================
class IdentityDocumentDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, identityDocumentId ):
		try:	
			identityDocument = IdentityDocument.objects.filter(id=identityDocumentId)
			return identityDocument.first();
		except IdentityDocument.DoesNotExist:
			raise ProcessingError("IdentityDocument with id " + str(identityDocumentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, identityDocument):
		for model in serializers.deserialize("json", identityDocument):
			model.save()
			return model;

	def create(self, identityDocument):
		identityDocument.save()
		return identityDocument;

	def saveFromJson(self, identityDocument):
		for model in serializers.deserialize("json", identityDocument):
			model.save()
			return identityDocument;
	
	def save(self, identityDocument):
		identityDocument.save()
		return identityDocument;
	
	def delete(self, identityDocumentId ):
		errMsg = "Failed to delete IdentityDocument from db using id " + str(identityDocumentId)
		
		try:
			identityDocument = IdentityDocument.objects.get(id=identityDocumentId)
			identityDocument.delete()
			return True
		except IdentityDocument.DoesNotExist:
			raise ProcessingError("IdentityDocument with id " + str(identityDocumentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = IdentityDocument.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all IdentityDocument from db")
		except Exception:
			return None;
		
	def assignKycProfile( self, identityDocumentId, kycProfileId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.KycProfileDelegate import KycProfileDelegate

		errMsg = "Failed to assign element " + str(kycProfileId) + " for KycProfile on IdentityDocument"

		try:
			# get the IdentityDocument from db
			identityDocument = self.get( identityDocumentId ).first()	
			
			# get the KycProfile from db
			kycProfile = KycProfileDelegate().get(kycProfileId).first();
			
			# assign the KycProfile		
			identityDocument.kycProfile = kycProfile
			
			#save it
			identityDocument.save()

			# reload and return the appropriate version					
			return self.get( identityDocumentId );
		except IdentityDocument.DoesNotExist:
			raise ProcessingError(errMsg + " : IdentityDocument with id " + str(identityDocumentId) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile with id " + str(kycProfileId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignKycProfile( self, identityDocumentId ):
		errMsg = "Failed to unassign element " + str(kycProfileId) + " for KycProfile on IdentityDocument"

		try:
			# get the IdentityDocument from db
			identityDocument = self.get( identityDocumentId ).first()	
			
			# assign to None for unassignment
			identityDocument.kycProfile = None			

			#save it
			identityDocument.save()

			# reload and return the appropriate version					
			return self.get( identityDocumentId );
		except IdentityDocument.DoesNotExist:
			raise ProcessingError(errMsg + " : IdentityDocument with id " + str(identityDocumentId) + " does not exist.")
		except Exception:
			return None;
		
