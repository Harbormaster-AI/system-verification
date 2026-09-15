
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.MessagingEndpoint import MessagingEndpoint
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model MessagingEndpoint
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MessagingEndpointDelegate Declaration
#======================================================================
class MessagingEndpointDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, messagingEndpointId ):
		try:	
			messagingEndpoint = MessagingEndpoint.objects.filter(id=messagingEndpointId)
			return messagingEndpoint.first();
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError("MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, messagingEndpoint):
		for model in serializers.deserialize("json", messagingEndpoint):
			model.save()
			return model;

	def create(self, messagingEndpoint):
		messagingEndpoint.save()
		return messagingEndpoint;

	def saveFromJson(self, messagingEndpoint):
		for model in serializers.deserialize("json", messagingEndpoint):
			model.save()
			return messagingEndpoint;
	
	def save(self, messagingEndpoint):
		messagingEndpoint.save()
		return messagingEndpoint;
	
	def delete(self, messagingEndpointId ):
		errMsg = "Failed to delete MessagingEndpoint from db using id " + str(messagingEndpointId)
		
		try:
			messagingEndpoint = MessagingEndpoint.objects.get(id=messagingEndpointId)
			messagingEndpoint.delete()
			return True
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError("MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = MessagingEndpoint.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all MessagingEndpoint from db")
		except Exception:
			return None;
		
	def assignTenant( self, messagingEndpointId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on MessagingEndpoint"

		try:
			# get the MessagingEndpoint from db
			messagingEndpoint = self.get( messagingEndpointId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			messagingEndpoint.tenant = tenant
			
			#save it
			messagingEndpoint.save()

			# reload and return the appropriate version					
			return self.get( messagingEndpointId );
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, messagingEndpointId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on MessagingEndpoint"

		try:
			# get the MessagingEndpoint from db
			messagingEndpoint = self.get( messagingEndpointId ).first()	
			
			# assign to None for unassignment
			messagingEndpoint.tenant = None			

			#save it
			messagingEndpoint.save()

			# reload and return the appropriate version					
			return self.get( messagingEndpointId );
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except Exception:
			return None;
		
	def addStreams( self, messagingEndpointId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(streamsIds) + " for Streams on MessagingEndpoint"

		try:
			# get the MessagingEndpoint
			messagingEndpoint = self.get( messagingEndpointId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				messagingEndpoint.streams.add(telemetryStream)
				
			# save it		
			messagingEndpoint.save()
			
			# reload and return the appropriate version
			return self.get( messagingEndpointId );
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStreams( self, messagingEndpointId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(streamsIds) + " for Streams on MessagingEndpoint"

		try:
			# get the MessagingEndpoint
			messagingEndpoint = self.get( messagingEndpointId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				messagingEndpoint.streams.remove(telemetryStream)
				
			# save it		
			messagingEndpoint.save()
			
			# reload and return the appropriate version
			return self.get( messagingEndpointId );
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint with id " + str(messagingEndpointId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
