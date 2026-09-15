
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DigitalTwin import DigitalTwin
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.models.TwinTemplate import TwinTemplate
from iotOnDjango.models.TwinChangeEvent import TwinChangeEvent
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DigitalTwin
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DigitalTwinDelegate Declaration
#======================================================================
class DigitalTwinDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, digitalTwinId ):
		try:	
			digitalTwin = DigitalTwin.objects.filter(id=digitalTwinId)
			return digitalTwin.first();
		except DigitalTwin.DoesNotExist:
			raise ProcessingError("DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, digitalTwin):
		for model in serializers.deserialize("json", digitalTwin):
			model.save()
			return model;

	def create(self, digitalTwin):
		digitalTwin.save()
		return digitalTwin;

	def saveFromJson(self, digitalTwin):
		for model in serializers.deserialize("json", digitalTwin):
			model.save()
			return digitalTwin;
	
	def save(self, digitalTwin):
		digitalTwin.save()
		return digitalTwin;
	
	def delete(self, digitalTwinId ):
		errMsg = "Failed to delete DigitalTwin from db using id " + str(digitalTwinId)
		
		try:
			digitalTwin = DigitalTwin.objects.get(id=digitalTwinId)
			digitalTwin.delete()
			return True
		except DigitalTwin.DoesNotExist:
			raise ProcessingError("DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DigitalTwin.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DigitalTwin from db")
		except Exception:
			return None;
		
	def assignDevice( self, digitalTwinId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			digitalTwin.device = ioTDevice
			
			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, digitalTwinId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# assign to None for unassignment
			digitalTwin.ioTDevice = None			

			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Exception:
			return None;
		
	def assignGateway( self, digitalTwinId, gatewayId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to assign element " + str(gatewayId) + " for Gateway on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# get the Gateway from db
			gateway = GatewayDelegate().get(gatewayId).first();
			
			# assign the Gateway		
			digitalTwin.gateway = gateway
			
			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignGateway( self, digitalTwinId ):
		errMsg = "Failed to unassign element " + str(gatewayId) + " for Gateway on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# assign to None for unassignment
			digitalTwin.gateway = None			

			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTemplate( self, digitalTwinId, templateId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TwinTemplateDelegate import TwinTemplateDelegate

		errMsg = "Failed to assign element " + str(templateId) + " for Template on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# get the TwinTemplate from db
			twinTemplate = TwinTemplateDelegate().get(templateId).first();
			
			# assign the Template		
			digitalTwin.template = twinTemplate
			
			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except TwinTemplate.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinTemplate with id " + str(templateId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTemplate( self, digitalTwinId ):
		errMsg = "Failed to unassign element " + str(templateId) + " for Template on DigitalTwin"

		try:
			# get the DigitalTwin from db
			digitalTwin = self.get( digitalTwinId ).first()	
			
			# assign to None for unassignment
			digitalTwin.twinTemplate = None			

			#save it
			digitalTwin.save()

			# reload and return the appropriate version					
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Exception:
			return None;
		
	def addChangeEvents( self, digitalTwinId, changeEventsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TwinChangeEventDelegate import TwinChangeEventDelegate

		errMsg = "Failed to add elements " + str(changeEventsIds) + " for ChangeEvents on DigitalTwin"

		try:
			# get the DigitalTwin
			digitalTwin = self.get( digitalTwinId ).first()
				
			# split on a comma with no spaces
			idList = changeEventsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TwinChangeEvent		
				twinChangeEvent = TwinChangeEventDelegate().get(id).first();	
				# add the TwinChangeEvent
				digitalTwin.changeEvents.add(twinChangeEvent)
				
			# save it		
			digitalTwin.save()
			
			# reload and return the appropriate version
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinChangeEvent does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeChangeEvents( self, digitalTwinId, changeEventsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TwinChangeEventDelegate import TwinChangeEventDelegate

		errMsg = "Failed to remove elements " + str(changeEventsIds) + " for ChangeEvents on DigitalTwin"

		try:
			# get the DigitalTwin
			digitalTwin = self.get( digitalTwinId ).first()
				
			# split on a comma with no spaces
			idList = changeEventsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TwinChangeEvent		
				twinChangeEvent = TwinChangeEventDelegate().get(id).first();	
				# add the TwinChangeEvent
				digitalTwin.changeEvents.remove(twinChangeEvent)
				
			# save it		
			digitalTwin.save()
			
			# reload and return the appropriate version
			return self.get( digitalTwinId );
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinChangeEvent does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
