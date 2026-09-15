
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.TelemetrySchema import TelemetrySchema
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model TelemetrySchema
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetrySchemaDelegate Declaration
#======================================================================
class TelemetrySchemaDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, telemetrySchemaId ):
		try:	
			telemetrySchema = TelemetrySchema.objects.filter(id=telemetrySchemaId)
			return telemetrySchema.first();
		except TelemetrySchema.DoesNotExist:
			raise ProcessingError("TelemetrySchema with id " + str(telemetrySchemaId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, telemetrySchema):
		for model in serializers.deserialize("json", telemetrySchema):
			model.save()
			return model;

	def create(self, telemetrySchema):
		telemetrySchema.save()
		return telemetrySchema;

	def saveFromJson(self, telemetrySchema):
		for model in serializers.deserialize("json", telemetrySchema):
			model.save()
			return telemetrySchema;
	
	def save(self, telemetrySchema):
		telemetrySchema.save()
		return telemetrySchema;
	
	def delete(self, telemetrySchemaId ):
		errMsg = "Failed to delete TelemetrySchema from db using id " + str(telemetrySchemaId)
		
		try:
			telemetrySchema = TelemetrySchema.objects.get(id=telemetrySchemaId)
			telemetrySchema.delete()
			return True
		except TelemetrySchema.DoesNotExist:
			raise ProcessingError("TelemetrySchema with id " + str(telemetrySchemaId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = TelemetrySchema.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all TelemetrySchema from db")
		except Exception:
			return None;
		
	def addStreams( self, telemetrySchemaId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(streamsIds) + " for Streams on TelemetrySchema"

		try:
			# get the TelemetrySchema
			telemetrySchema = self.get( telemetrySchemaId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				telemetrySchema.streams.add(telemetryStream)
				
			# save it		
			telemetrySchema.save()
			
			# reload and return the appropriate version
			return self.get( telemetrySchemaId );
		except TelemetrySchema.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetrySchema with id " + str(telemetrySchemaId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStreams( self, telemetrySchemaId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(streamsIds) + " for Streams on TelemetrySchema"

		try:
			# get the TelemetrySchema
			telemetrySchema = self.get( telemetrySchemaId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				telemetrySchema.streams.remove(telemetryStream)
				
			# save it		
			telemetrySchema.save()
			
			# reload and return the appropriate version
			return self.get( telemetrySchemaId );
		except TelemetrySchema.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetrySchema with id " + str(telemetrySchemaId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
