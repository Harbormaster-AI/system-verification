
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.AccessPolicy import AccessPolicy
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.ApiKey import ApiKey
from iotOnDjango.models.TenantUser import TenantUser
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model AccessPolicy
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccessPolicyDelegate Declaration
#======================================================================
class AccessPolicyDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, accessPolicyId ):
		try:	
			accessPolicy = AccessPolicy.objects.filter(id=accessPolicyId)
			return accessPolicy.first();
		except AccessPolicy.DoesNotExist:
			raise ProcessingError("AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, accessPolicy):
		for model in serializers.deserialize("json", accessPolicy):
			model.save()
			return model;

	def create(self, accessPolicy):
		accessPolicy.save()
		return accessPolicy;

	def saveFromJson(self, accessPolicy):
		for model in serializers.deserialize("json", accessPolicy):
			model.save()
			return accessPolicy;
	
	def save(self, accessPolicy):
		accessPolicy.save()
		return accessPolicy;
	
	def delete(self, accessPolicyId ):
		errMsg = "Failed to delete AccessPolicy from db using id " + str(accessPolicyId)
		
		try:
			accessPolicy = AccessPolicy.objects.get(id=accessPolicyId)
			accessPolicy.delete()
			return True
		except AccessPolicy.DoesNotExist:
			raise ProcessingError("AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = AccessPolicy.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all AccessPolicy from db")
		except Exception:
			return None;
		
	def assignTenant( self, accessPolicyId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on AccessPolicy"

		try:
			# get the AccessPolicy from db
			accessPolicy = self.get( accessPolicyId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			accessPolicy.tenant = tenant
			
			#save it
			accessPolicy.save()

			# reload and return the appropriate version					
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, accessPolicyId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on AccessPolicy"

		try:
			# get the AccessPolicy from db
			accessPolicy = self.get( accessPolicyId ).first()	
			
			# assign to None for unassignment
			accessPolicy.tenant = None			

			#save it
			accessPolicy.save()

			# reload and return the appropriate version					
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except Exception:
			return None;
		
	def addApiKeys( self, accessPolicyId, apiKeysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ApiKeyDelegate import ApiKeyDelegate

		errMsg = "Failed to add elements " + str(apiKeysIds) + " for ApiKeys on AccessPolicy"

		try:
			# get the AccessPolicy
			accessPolicy = self.get( accessPolicyId ).first()
				
			# split on a comma with no spaces
			idList = apiKeysIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ApiKey		
				apiKey = ApiKeyDelegate().get(id).first();	
				# add the ApiKey
				accessPolicy.apiKeys.add(apiKey)
				
			# save it		
			accessPolicy.save()
			
			# reload and return the appropriate version
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except ApiKey.DoesNotExist:
			raise ProcessingError(errMsg + " : ApiKey does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeApiKeys( self, accessPolicyId, apiKeysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ApiKeyDelegate import ApiKeyDelegate

		errMsg = "Failed to remove elements " + str(apiKeysIds) + " for ApiKeys on AccessPolicy"

		try:
			# get the AccessPolicy
			accessPolicy = self.get( accessPolicyId ).first()
				
			# split on a comma with no spaces
			idList = apiKeysIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ApiKey		
				apiKey = ApiKeyDelegate().get(id).first();	
				# add the ApiKey
				accessPolicy.apiKeys.remove(apiKey)
				
			# save it		
			accessPolicy.save()
			
			# reload and return the appropriate version
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except ApiKey.DoesNotExist:
			raise ProcessingError(errMsg + " : ApiKey does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addUsers( self, accessPolicyId, usersIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

		errMsg = "Failed to add elements " + str(usersIds) + " for Users on AccessPolicy"

		try:
			# get the AccessPolicy
			accessPolicy = self.get( accessPolicyId ).first()
				
			# split on a comma with no spaces
			idList = usersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TenantUser		
				tenantUser = TenantUserDelegate().get(id).first();	
				# add the TenantUser
				accessPolicy.users.add(tenantUser)
				
			# save it		
			accessPolicy.save()
			
			# reload and return the appropriate version
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeUsers( self, accessPolicyId, usersIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

		errMsg = "Failed to remove elements " + str(usersIds) + " for Users on AccessPolicy"

		try:
			# get the AccessPolicy
			accessPolicy = self.get( accessPolicyId ).first()
				
			# split on a comma with no spaces
			idList = usersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TenantUser		
				tenantUser = TenantUserDelegate().get(id).first();	
				# add the TenantUser
				accessPolicy.users.remove(tenantUser)
				
			# save it		
			accessPolicy.save()
			
			# reload and return the appropriate version
			return self.get( accessPolicyId );
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy with id " + str(accessPolicyId) + " does not exist.")
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
