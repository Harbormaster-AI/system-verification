
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.SensorInstance import SensorInstance
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model SensorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SensorInstanceDelegate Declaration
#======================================================================
class SensorInstanceDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, sensorInstanceId ):
		try:	
			sensorInstance = SensorInstance.objects.filter(id=sensorInstanceId)
			return sensorInstance.first();
		except SensorInstance.DoesNotExist:
			raise ProcessingError("SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, sensorInstance):
		for model in serializers.deserialize("json", sensorInstance):
			model.save()
			return model;

	def create(self, sensorInstance):
		sensorInstance.save()
		return sensorInstance;

	def saveFromJson(self, sensorInstance):
		for model in serializers.deserialize("json", sensorInstance):
			model.save()
			return sensorInstance;
	
	def save(self, sensorInstance):
		sensorInstance.save()
		return sensorInstance;
	
	def delete(self, sensorInstanceId ):
		errMsg = "Failed to delete SensorInstance from db using id " + str(sensorInstanceId)
		
		try:
			sensorInstance = SensorInstance.objects.get(id=sensorInstanceId)
			sensorInstance.delete()
			return True
		except SensorInstance.DoesNotExist:
			raise ProcessingError("SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = SensorInstance.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all SensorInstance from db")
		except Exception:
			return None;
		
	def assignDevice( self, sensorInstanceId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on SensorInstance"

		try:
			# get the SensorInstance from db
			sensorInstance = self.get( sensorInstanceId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			sensorInstance.device = ioTDevice
			
			#save it
			sensorInstance.save()

			# reload and return the appropriate version					
			return self.get( sensorInstanceId );
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, sensorInstanceId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on SensorInstance"

		try:
			# get the SensorInstance from db
			sensorInstance = self.get( sensorInstanceId ).first()	
			
			# assign to None for unassignment
			sensorInstance.ioTDevice = None			

			#save it
			sensorInstance.save()

			# reload and return the appropriate version					
			return self.get( sensorInstanceId );
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except Exception:
			return None;
		
	def addTelemetryStreams( self, sensorInstanceId, telemetryStreamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(telemetryStreamsIds) + " for TelemetryStreams on SensorInstance"

		try:
			# get the SensorInstance
			sensorInstance = self.get( sensorInstanceId ).first()
				
			# split on a comma with no spaces
			idList = telemetryStreamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				sensorInstance.telemetryStreams.add(telemetryStream)
				
			# save it		
			sensorInstance.save()
			
			# reload and return the appropriate version
			return self.get( sensorInstanceId );
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTelemetryStreams( self, sensorInstanceId, telemetryStreamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(telemetryStreamsIds) + " for TelemetryStreams on SensorInstance"

		try:
			# get the SensorInstance
			sensorInstance = self.get( sensorInstanceId ).first()
				
			# split on a comma with no spaces
			idList = telemetryStreamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				sensorInstance.telemetryStreams.remove(telemetryStream)
				
			# save it		
			sensorInstance.save()
			
			# reload and return the appropriate version
			return self.get( sensorInstanceId );
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance with id " + str(sensorInstanceId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
