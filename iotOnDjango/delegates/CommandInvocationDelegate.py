
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.CommandInvocation import CommandInvocation
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.CommandDefinition import CommandDefinition
from iotOnDjango.models.ActuatorInstance import ActuatorInstance
from iotOnDjango.models.TenantUser import TenantUser
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model CommandInvocation
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandInvocationDelegate Declaration
#======================================================================
class CommandInvocationDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, commandInvocationId ):
		try:	
			commandInvocation = CommandInvocation.objects.filter(id=commandInvocationId)
			return commandInvocation.first();
		except CommandInvocation.DoesNotExist:
			raise ProcessingError("CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, commandInvocation):
		for model in serializers.deserialize("json", commandInvocation):
			model.save()
			return model;

	def create(self, commandInvocation):
		commandInvocation.save()
		return commandInvocation;

	def saveFromJson(self, commandInvocation):
		for model in serializers.deserialize("json", commandInvocation):
			model.save()
			return commandInvocation;
	
	def save(self, commandInvocation):
		commandInvocation.save()
		return commandInvocation;
	
	def delete(self, commandInvocationId ):
		errMsg = "Failed to delete CommandInvocation from db using id " + str(commandInvocationId)
		
		try:
			commandInvocation = CommandInvocation.objects.get(id=commandInvocationId)
			commandInvocation.delete()
			return True
		except CommandInvocation.DoesNotExist:
			raise ProcessingError("CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = CommandInvocation.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all CommandInvocation from db")
		except Exception:
			return None;
		
	def assignDevice( self, commandInvocationId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			commandInvocation.device = ioTDevice
			
			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, commandInvocationId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# assign to None for unassignment
			commandInvocation.ioTDevice = None			

			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except Exception:
			return None;
		
	def assignCommandDefinition( self, commandInvocationId, commandDefinitionId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

		errMsg = "Failed to assign element " + str(commandDefinitionId) + " for CommandDefinition on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# get the CommandDefinition from db
			commandDefinition = CommandDefinitionDelegate().get(commandDefinitionId).first();
			
			# assign the CommandDefinition		
			commandInvocation.commandDefinition = commandDefinition
			
			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCommandDefinition( self, commandInvocationId ):
		errMsg = "Failed to unassign element " + str(commandDefinitionId) + " for CommandDefinition on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# assign to None for unassignment
			commandInvocation.commandDefinition = None			

			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except Exception:
			return None;
		
	def assignActuator( self, commandInvocationId, actuatorId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

		errMsg = "Failed to assign element " + str(actuatorId) + " for Actuator on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# get the ActuatorInstance from db
			actuatorInstance = ActuatorInstanceDelegate().get(actuatorId).first();
			
			# assign the Actuator		
			commandInvocation.actuator = actuatorInstance
			
			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance with id " + str(actuatorId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignActuator( self, commandInvocationId ):
		errMsg = "Failed to unassign element " + str(actuatorId) + " for Actuator on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# assign to None for unassignment
			commandInvocation.actuatorInstance = None			

			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except Exception:
			return None;
		
	def assignUser( self, commandInvocationId, userId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

		errMsg = "Failed to assign element " + str(userId) + " for User on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# get the TenantUser from db
			tenantUser = TenantUserDelegate().get(userId).first();
			
			# assign the User		
			commandInvocation.user = tenantUser
			
			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser with id " + str(userId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignUser( self, commandInvocationId ):
		errMsg = "Failed to unassign element " + str(userId) + " for User on CommandInvocation"

		try:
			# get the CommandInvocation from db
			commandInvocation = self.get( commandInvocationId ).first()	
			
			# assign to None for unassignment
			commandInvocation.tenantUser = None			

			#save it
			commandInvocation.save()

			# reload and return the appropriate version					
			return self.get( commandInvocationId );
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation with id " + str(commandInvocationId) + " does not exist.")
		except Exception:
			return None;
		
