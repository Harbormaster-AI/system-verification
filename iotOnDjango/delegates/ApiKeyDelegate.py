
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.ApiKey import ApiKey
from iotOnDjango.models.AccessPolicy import AccessPolicy
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ApiKey
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ApiKeyDelegate Declaration
#======================================================================
class ApiKeyDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, apiKeyId ):
		try:	
			apiKey = ApiKey.objects.filter(id=apiKeyId)
			return apiKey.first();
		except ApiKey.DoesNotExist:
			raise ProcessingError("ApiKey with id " + str(apiKeyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, apiKey):
		for model in serializers.deserialize("json", apiKey):
			model.save()
			return model;

	def create(self, apiKey):
		apiKey.save()
		return apiKey;

	def saveFromJson(self, apiKey):
		for model in serializers.deserialize("json", apiKey):
			model.save()
			return apiKey;
	
	def save(self, apiKey):
		apiKey.save()
		return apiKey;
	
	def delete(self, apiKeyId ):
		errMsg = "Failed to delete ApiKey from db using id " + str(apiKeyId)
		
		try:
			apiKey = ApiKey.objects.get(id=apiKeyId)
			apiKey.delete()
			return True
		except ApiKey.DoesNotExist:
			raise ProcessingError("ApiKey with id " + str(apiKeyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ApiKey.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ApiKey from db")
		except Exception:
			return None;
		
	def assignAccessPolicy( self, apiKeyId, accessPolicyId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AccessPolicyDelegate import AccessPolicyDelegate

		errMsg = "Failed to assign element " + str(accessPolicyId) + " for AccessPolicy on ApiKey"

		try:
			# get the ApiKey from db
			apiKey = self.get( apiKeyId ).first()	
			
			# get the AccessPolicy from db
			accessPolicy = AccessPolicyDelegate().get(accessPolicyId).first();
			
			# assign the AccessPolicy		
			apiKey.accessPolicy = accessPolicy
			
			#save it
			apiKey.save()

			# reload and return the appropriate version					
			return self.get( apiKeyId );
		except ApiKey.DoesNotExist:
			raise ProcessingError(errMsg + " : ApiKey with id " + str(apiKeyId) + " does not exist.")
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccessPolicy( self, apiKeyId ):
		errMsg = "Failed to unassign element " + str(accessPolicyId) + " for AccessPolicy on ApiKey"

		try:
			# get the ApiKey from db
			apiKey = self.get( apiKeyId ).first()	
			
			# assign to None for unassignment
			apiKey.accessPolicy = None			

			#save it
			apiKey.save()

			# reload and return the appropriate version					
			return self.get( apiKeyId );
		except ApiKey.DoesNotExist:
			raise ProcessingError(errMsg + " : ApiKey with id " + str(apiKeyId) + " does not exist.")
		except Exception:
			return None;
		
