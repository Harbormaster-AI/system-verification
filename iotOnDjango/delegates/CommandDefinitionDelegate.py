
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.CommandDefinition import CommandDefinition
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.models.ActuatorInstance import ActuatorInstance
from iotOnDjango.models.CommandInvocation import CommandInvocation
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model CommandDefinition
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandDefinitionDelegate Declaration
#======================================================================
class CommandDefinitionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, commandDefinitionId ):
		try:	
			commandDefinition = CommandDefinition.objects.filter(id=commandDefinitionId)
			return commandDefinition.first();
		except CommandDefinition.DoesNotExist:
			raise ProcessingError("CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, commandDefinition):
		for model in serializers.deserialize("json", commandDefinition):
			model.save()
			return model;

	def create(self, commandDefinition):
		commandDefinition.save()
		return commandDefinition;

	def saveFromJson(self, commandDefinition):
		for model in serializers.deserialize("json", commandDefinition):
			model.save()
			return commandDefinition;
	
	def save(self, commandDefinition):
		commandDefinition.save()
		return commandDefinition;
	
	def delete(self, commandDefinitionId ):
		errMsg = "Failed to delete CommandDefinition from db using id " + str(commandDefinitionId)
		
		try:
			commandDefinition = CommandDefinition.objects.get(id=commandDefinitionId)
			commandDefinition.delete()
			return True
		except CommandDefinition.DoesNotExist:
			raise ProcessingError("CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = CommandDefinition.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all CommandDefinition from db")
		except Exception:
			return None;
		
	def assignDeviceModel( self, commandDefinitionId, deviceModelId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to assign element " + str(deviceModelId) + " for DeviceModel on CommandDefinition"

		try:
			# get the CommandDefinition from db
			commandDefinition = self.get( commandDefinitionId ).first()	
			
			# get the DeviceModel from db
			deviceModel = DeviceModelDelegate().get(deviceModelId).first();
			
			# assign the DeviceModel		
			commandDefinition.deviceModel = deviceModel
			
			#save it
			commandDefinition.save()

			# reload and return the appropriate version					
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDeviceModel( self, commandDefinitionId ):
		errMsg = "Failed to unassign element " + str(deviceModelId) + " for DeviceModel on CommandDefinition"

		try:
			# get the CommandDefinition from db
			commandDefinition = self.get( commandDefinitionId ).first()	
			
			# assign to None for unassignment
			commandDefinition.deviceModel = None			

			#save it
			commandDefinition.save()

			# reload and return the appropriate version					
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except Exception:
			return None;
		
	def addActuators( self, commandDefinitionId, actuatorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

		errMsg = "Failed to add elements " + str(actuatorsIds) + " for Actuators on CommandDefinition"

		try:
			# get the CommandDefinition
			commandDefinition = self.get( commandDefinitionId ).first()
				
			# split on a comma with no spaces
			idList = actuatorsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ActuatorInstance		
				actuatorInstance = ActuatorInstanceDelegate().get(id).first();	
				# add the ActuatorInstance
				commandDefinition.actuators.add(actuatorInstance)
				
			# save it		
			commandDefinition.save()
			
			# reload and return the appropriate version
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeActuators( self, commandDefinitionId, actuatorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

		errMsg = "Failed to remove elements " + str(actuatorsIds) + " for Actuators on CommandDefinition"

		try:
			# get the CommandDefinition
			commandDefinition = self.get( commandDefinitionId ).first()
				
			# split on a comma with no spaces
			idList = actuatorsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ActuatorInstance		
				actuatorInstance = ActuatorInstanceDelegate().get(id).first();	
				# add the ActuatorInstance
				commandDefinition.actuators.remove(actuatorInstance)
				
			# save it		
			commandDefinition.save()
			
			# reload and return the appropriate version
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCommandInvocations( self, commandDefinitionId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to add elements " + str(commandInvocationsIds) + " for CommandInvocations on CommandDefinition"

		try:
			# get the CommandDefinition
			commandDefinition = self.get( commandDefinitionId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				commandDefinition.commandInvocations.add(commandInvocation)
				
			# save it		
			commandDefinition.save()
			
			# reload and return the appropriate version
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCommandInvocations( self, commandDefinitionId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to remove elements " + str(commandInvocationsIds) + " for CommandInvocations on CommandDefinition"

		try:
			# get the CommandDefinition
			commandDefinition = self.get( commandDefinitionId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				commandDefinition.commandInvocations.remove(commandInvocation)
				
			# save it		
			commandDefinition.save()
			
			# reload and return the appropriate version
			return self.get( commandDefinitionId );
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition with id " + str(commandDefinitionId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
