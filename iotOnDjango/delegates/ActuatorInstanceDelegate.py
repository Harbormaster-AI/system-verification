
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.ActuatorInstance import ActuatorInstance
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.CommandDefinition import CommandDefinition
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ActuatorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ActuatorInstanceDelegate Declaration
#======================================================================
class ActuatorInstanceDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, actuatorInstanceId ):
		try:	
			actuatorInstance = ActuatorInstance.objects.filter(id=actuatorInstanceId)
			return actuatorInstance.first();
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError("ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, actuatorInstance):
		for model in serializers.deserialize("json", actuatorInstance):
			model.save()
			return model;

	def create(self, actuatorInstance):
		actuatorInstance.save()
		return actuatorInstance;

	def saveFromJson(self, actuatorInstance):
		for model in serializers.deserialize("json", actuatorInstance):
			model.save()
			return actuatorInstance;
	
	def save(self, actuatorInstance):
		actuatorInstance.save()
		return actuatorInstance;
	
	def delete(self, actuatorInstanceId ):
		errMsg = "Failed to delete ActuatorInstance from db using id " + str(actuatorInstanceId)
		
		try:
			actuatorInstance = ActuatorInstance.objects.get(id=actuatorInstanceId)
			actuatorInstance.delete()
			return True
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError("ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ActuatorInstance.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ActuatorInstance from db")
		except Exception:
			return None;
		
	def assignDevice( self, actuatorInstanceId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on ActuatorInstance"

		try:
			# get the ActuatorInstance from db
			actuatorInstance = self.get( actuatorInstanceId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			actuatorInstance.device = ioTDevice
			
			#save it
			actuatorInstance.save()

			# reload and return the appropriate version					
			return self.get( actuatorInstanceId );
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, actuatorInstanceId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on ActuatorInstance"

		try:
			# get the ActuatorInstance from db
			actuatorInstance = self.get( actuatorInstanceId ).first()	
			
			# assign to None for unassignment
			actuatorInstance.ioTDevice = None			

			#save it
			actuatorInstance.save()

			# reload and return the appropriate version					
			return self.get( actuatorInstanceId );
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except Exception:
			return None;
		
	def addSupportedCommands( self, actuatorInstanceId, supportedCommandsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

		errMsg = "Failed to add elements " + str(supportedCommandsIds) + " for SupportedCommands on ActuatorInstance"

		try:
			# get the ActuatorInstance
			actuatorInstance = self.get( actuatorInstanceId ).first()
				
			# split on a comma with no spaces
			idList = supportedCommandsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the CommandDefinition		
				commandDefinition = CommandDefinitionDelegate().get(id).first();	
				# add the CommandDefinition
				actuatorInstance.supportedCommands.add(commandDefinition)
				
			# save it		
			actuatorInstance.save()
			
			# reload and return the appropriate version
			return self.get( actuatorInstanceId );
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeSupportedCommands( self, actuatorInstanceId, supportedCommandsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

		errMsg = "Failed to remove elements " + str(supportedCommandsIds) + " for SupportedCommands on ActuatorInstance"

		try:
			# get the ActuatorInstance
			actuatorInstance = self.get( actuatorInstanceId ).first()
				
			# split on a comma with no spaces
			idList = supportedCommandsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the CommandDefinition		
				commandDefinition = CommandDefinitionDelegate().get(id).first();	
				# add the CommandDefinition
				actuatorInstance.supportedCommands.remove(commandDefinition)
				
			# save it		
			actuatorInstance.save()
			
			# reload and return the appropriate version
			return self.get( actuatorInstanceId );
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance with id " + str(actuatorInstanceId) + " does not exist.")
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
