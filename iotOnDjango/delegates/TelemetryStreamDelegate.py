
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.SensorInstance import SensorInstance
from iotOnDjango.models.TelemetrySchema import TelemetrySchema
from iotOnDjango.models.MessagingEndpoint import MessagingEndpoint
from iotOnDjango.models.DataRetentionPolicy import DataRetentionPolicy
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model TelemetryStream
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetryStreamDelegate Declaration
#======================================================================
class TelemetryStreamDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, telemetryStreamId ):
		try:	
			telemetryStream = TelemetryStream.objects.filter(id=telemetryStreamId)
			return telemetryStream.first();
		except TelemetryStream.DoesNotExist:
			raise ProcessingError("TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, telemetryStream):
		for model in serializers.deserialize("json", telemetryStream):
			model.save()
			return model;

	def create(self, telemetryStream):
		telemetryStream.save()
		return telemetryStream;

	def saveFromJson(self, telemetryStream):
		for model in serializers.deserialize("json", telemetryStream):
			model.save()
			return telemetryStream;
	
	def save(self, telemetryStream):
		telemetryStream.save()
		return telemetryStream;
	
	def delete(self, telemetryStreamId ):
		errMsg = "Failed to delete TelemetryStream from db using id " + str(telemetryStreamId)
		
		try:
			telemetryStream = TelemetryStream.objects.get(id=telemetryStreamId)
			telemetryStream.delete()
			return True
		except TelemetryStream.DoesNotExist:
			raise ProcessingError("TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = TelemetryStream.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all TelemetryStream from db")
		except Exception:
			return None;
		
	def assignDevice( self, telemetryStreamId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			telemetryStream.device = ioTDevice
			
			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, telemetryStreamId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# assign to None for unassignment
			telemetryStream.ioTDevice = None			

			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except Exception:
			return None;
		
	def assignSensor( self, telemetryStreamId, sensorId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SensorInstanceDelegate import SensorInstanceDelegate

		errMsg = "Failed to assign element " + str(sensorId) + " for Sensor on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# get the SensorInstance from db
			sensorInstance = SensorInstanceDelegate().get(sensorId).first();
			
			# assign the Sensor		
			telemetryStream.sensor = sensorInstance
			
			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance with id " + str(sensorId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSensor( self, telemetryStreamId ):
		errMsg = "Failed to unassign element " + str(sensorId) + " for Sensor on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# assign to None for unassignment
			telemetryStream.sensorInstance = None			

			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except Exception:
			return None;
		
	def assignSchema( self, telemetryStreamId, schemaId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetrySchemaDelegate import TelemetrySchemaDelegate

		errMsg = "Failed to assign element " + str(schemaId) + " for Schema on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# get the TelemetrySchema from db
			telemetrySchema = TelemetrySchemaDelegate().get(schemaId).first();
			
			# assign the Schema		
			telemetryStream.schema = telemetrySchema
			
			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except TelemetrySchema.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetrySchema with id " + str(schemaId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSchema( self, telemetryStreamId ):
		errMsg = "Failed to unassign element " + str(schemaId) + " for Schema on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# assign to None for unassignment
			telemetryStream.telemetrySchema = None			

			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except Exception:
			return None;
		
	def assignMessagingEndpoint( self, telemetryStreamId, messagingEndpointId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.MessagingEndpointDelegate import MessagingEndpointDelegate

		errMsg = "Failed to assign element " + str(messagingEndpointId) + " for MessagingEndpoint on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# get the MessagingEndpoint from db
			messagingEndpoint = MessagingEndpointDelegate().get(messagingEndpointId).first();
			
			# assign the MessagingEndpoint		
			telemetryStream.messagingEndpoint = messagingEndpoint
			
			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignMessagingEndpoint( self, telemetryStreamId ):
		errMsg = "Failed to unassign element " + str(messagingEndpointId) + " for MessagingEndpoint on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# assign to None for unassignment
			telemetryStream.messagingEndpoint = None			

			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except Exception:
			return None;
		
	def assignRetentionPolicy( self, telemetryStreamId, retentionPolicyId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DataRetentionPolicyDelegate import DataRetentionPolicyDelegate

		errMsg = "Failed to assign element " + str(retentionPolicyId) + " for RetentionPolicy on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# get the DataRetentionPolicy from db
			dataRetentionPolicy = DataRetentionPolicyDelegate().get(retentionPolicyId).first();
			
			# assign the RetentionPolicy		
			telemetryStream.retentionPolicy = dataRetentionPolicy
			
			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy with id " + str(retentionPolicyId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignRetentionPolicy( self, telemetryStreamId ):
		errMsg = "Failed to unassign element " + str(retentionPolicyId) + " for RetentionPolicy on TelemetryStream"

		try:
			# get the TelemetryStream from db
			telemetryStream = self.get( telemetryStreamId ).first()	
			
			# assign to None for unassignment
			telemetryStream.dataRetentionPolicy = None			

			#save it
			telemetryStream.save()

			# reload and return the appropriate version					
			return self.get( telemetryStreamId );
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream with id " + str(telemetryStreamId) + " does not exist.")
		except Exception:
			return None;
		
