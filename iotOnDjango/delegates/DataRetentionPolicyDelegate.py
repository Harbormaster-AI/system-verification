
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DataRetentionPolicy import DataRetentionPolicy
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DataRetentionPolicy
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DataRetentionPolicyDelegate Declaration
#======================================================================
class DataRetentionPolicyDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, dataRetentionPolicyId ):
		try:	
			dataRetentionPolicy = DataRetentionPolicy.objects.filter(id=dataRetentionPolicyId)
			return dataRetentionPolicy.first();
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError("DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, dataRetentionPolicy):
		for model in serializers.deserialize("json", dataRetentionPolicy):
			model.save()
			return model;

	def create(self, dataRetentionPolicy):
		dataRetentionPolicy.save()
		return dataRetentionPolicy;

	def saveFromJson(self, dataRetentionPolicy):
		for model in serializers.deserialize("json", dataRetentionPolicy):
			model.save()
			return dataRetentionPolicy;
	
	def save(self, dataRetentionPolicy):
		dataRetentionPolicy.save()
		return dataRetentionPolicy;
	
	def delete(self, dataRetentionPolicyId ):
		errMsg = "Failed to delete DataRetentionPolicy from db using id " + str(dataRetentionPolicyId)
		
		try:
			dataRetentionPolicy = DataRetentionPolicy.objects.get(id=dataRetentionPolicyId)
			dataRetentionPolicy.delete()
			return True
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError("DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DataRetentionPolicy.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DataRetentionPolicy from db")
		except Exception:
			return None;
		
	def assignTenant( self, dataRetentionPolicyId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on DataRetentionPolicy"

		try:
			# get the DataRetentionPolicy from db
			dataRetentionPolicy = self.get( dataRetentionPolicyId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			dataRetentionPolicy.tenant = tenant
			
			#save it
			dataRetentionPolicy.save()

			# reload and return the appropriate version					
			return self.get( dataRetentionPolicyId );
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, dataRetentionPolicyId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on DataRetentionPolicy"

		try:
			# get the DataRetentionPolicy from db
			dataRetentionPolicy = self.get( dataRetentionPolicyId ).first()	
			
			# assign to None for unassignment
			dataRetentionPolicy.tenant = None			

			#save it
			dataRetentionPolicy.save()

			# reload and return the appropriate version					
			return self.get( dataRetentionPolicyId );
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except Exception:
			return None;
		
	def addStreams( self, dataRetentionPolicyId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(streamsIds) + " for Streams on DataRetentionPolicy"

		try:
			# get the DataRetentionPolicy
			dataRetentionPolicy = self.get( dataRetentionPolicyId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				dataRetentionPolicy.streams.add(telemetryStream)
				
			# save it		
			dataRetentionPolicy.save()
			
			# reload and return the appropriate version
			return self.get( dataRetentionPolicyId );
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStreams( self, dataRetentionPolicyId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(streamsIds) + " for Streams on DataRetentionPolicy"

		try:
			# get the DataRetentionPolicy
			dataRetentionPolicy = self.get( dataRetentionPolicyId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				dataRetentionPolicy.streams.remove(telemetryStream)
				
			# save it		
			dataRetentionPolicy.save()
			
			# reload and return the appropriate version
			return self.get( dataRetentionPolicyId );
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy with id " + str(dataRetentionPolicyId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
