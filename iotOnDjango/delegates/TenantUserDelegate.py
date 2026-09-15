
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.TenantUser import TenantUser
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.CommandInvocation import CommandInvocation
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model TenantUser
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantUserDelegate Declaration
#======================================================================
class TenantUserDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, tenantUserId ):
		try:	
			tenantUser = TenantUser.objects.filter(id=tenantUserId)
			return tenantUser.first();
		except TenantUser.DoesNotExist:
			raise ProcessingError("TenantUser with id " + str(tenantUserId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, tenantUser):
		for model in serializers.deserialize("json", tenantUser):
			model.save()
			return model;

	def create(self, tenantUser):
		tenantUser.save()
		return tenantUser;

	def saveFromJson(self, tenantUser):
		for model in serializers.deserialize("json", tenantUser):
			model.save()
			return tenantUser;
	
	def save(self, tenantUser):
		tenantUser.save()
		return tenantUser;
	
	def delete(self, tenantUserId ):
		errMsg = "Failed to delete TenantUser from db using id " + str(tenantUserId)
		
		try:
			tenantUser = TenantUser.objects.get(id=tenantUserId)
			tenantUser.delete()
			return True
		except TenantUser.DoesNotExist:
			raise ProcessingError("TenantUser with id " + str(tenantUserId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = TenantUser.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all TenantUser from db")
		except Exception:
			return None;
		
	def assignTenant( self, tenantUserId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on TenantUser"

		try:
			# get the TenantUser from db
			tenantUser = self.get( tenantUserId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			tenantUser.tenant = tenant
			
			#save it
			tenantUser.save()

			# reload and return the appropriate version					
			return self.get( tenantUserId );
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser with id " + str(tenantUserId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, tenantUserId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on TenantUser"

		try:
			# get the TenantUser from db
			tenantUser = self.get( tenantUserId ).first()	
			
			# assign to None for unassignment
			tenantUser.tenant = None			

			#save it
			tenantUser.save()

			# reload and return the appropriate version					
			return self.get( tenantUserId );
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser with id " + str(tenantUserId) + " does not exist.")
		except Exception:
			return None;
		
	def addCommandInvocations( self, tenantUserId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to add elements " + str(commandInvocationsIds) + " for CommandInvocations on TenantUser"

		try:
			# get the TenantUser
			tenantUser = self.get( tenantUserId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				tenantUser.commandInvocations.add(commandInvocation)
				
			# save it		
			tenantUser.save()
			
			# reload and return the appropriate version
			return self.get( tenantUserId );
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser with id " + str(tenantUserId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCommandInvocations( self, tenantUserId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to remove elements " + str(commandInvocationsIds) + " for CommandInvocations on TenantUser"

		try:
			# get the TenantUser
			tenantUser = self.get( tenantUserId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				tenantUser.commandInvocations.remove(commandInvocation)
				
			# save it		
			tenantUser.save()
			
			# reload and return the appropriate version
			return self.get( tenantUserId );
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser with id " + str(tenantUserId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
