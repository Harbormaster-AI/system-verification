
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.SoftwareUpdateExecution import SoftwareUpdateExecution
from iotOnDjango.models.SoftwareUpdateCampaign import SoftwareUpdateCampaign
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model SoftwareUpdateExecution
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateExecutionDelegate Declaration
#======================================================================
class SoftwareUpdateExecutionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, softwareUpdateExecutionId ):
		try:	
			softwareUpdateExecution = SoftwareUpdateExecution.objects.filter(id=softwareUpdateExecutionId)
			return softwareUpdateExecution.first();
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError("SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, softwareUpdateExecution):
		for model in serializers.deserialize("json", softwareUpdateExecution):
			model.save()
			return model;

	def create(self, softwareUpdateExecution):
		softwareUpdateExecution.save()
		return softwareUpdateExecution;

	def saveFromJson(self, softwareUpdateExecution):
		for model in serializers.deserialize("json", softwareUpdateExecution):
			model.save()
			return softwareUpdateExecution;
	
	def save(self, softwareUpdateExecution):
		softwareUpdateExecution.save()
		return softwareUpdateExecution;
	
	def delete(self, softwareUpdateExecutionId ):
		errMsg = "Failed to delete SoftwareUpdateExecution from db using id " + str(softwareUpdateExecutionId)
		
		try:
			softwareUpdateExecution = SoftwareUpdateExecution.objects.get(id=softwareUpdateExecutionId)
			softwareUpdateExecution.delete()
			return True
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError("SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = SoftwareUpdateExecution.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all SoftwareUpdateExecution from db")
		except Exception:
			return None;
		
	def assignCampaign( self, softwareUpdateExecutionId, campaignId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SoftwareUpdateCampaignDelegate import SoftwareUpdateCampaignDelegate

		errMsg = "Failed to assign element " + str(campaignId) + " for Campaign on SoftwareUpdateExecution"

		try:
			# get the SoftwareUpdateExecution from db
			softwareUpdateExecution = self.get( softwareUpdateExecutionId ).first()	
			
			# get the SoftwareUpdateCampaign from db
			softwareUpdateCampaign = SoftwareUpdateCampaignDelegate().get(campaignId).first();
			
			# assign the Campaign		
			softwareUpdateExecution.campaign = softwareUpdateCampaign
			
			#save it
			softwareUpdateExecution.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateExecutionId );
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(campaignId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCampaign( self, softwareUpdateExecutionId ):
		errMsg = "Failed to unassign element " + str(campaignId) + " for Campaign on SoftwareUpdateExecution"

		try:
			# get the SoftwareUpdateExecution from db
			softwareUpdateExecution = self.get( softwareUpdateExecutionId ).first()	
			
			# assign to None for unassignment
			softwareUpdateExecution.softwareUpdateCampaign = None			

			#save it
			softwareUpdateExecution.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateExecutionId );
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDevice( self, softwareUpdateExecutionId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on SoftwareUpdateExecution"

		try:
			# get the SoftwareUpdateExecution from db
			softwareUpdateExecution = self.get( softwareUpdateExecutionId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			softwareUpdateExecution.device = ioTDevice
			
			#save it
			softwareUpdateExecution.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateExecutionId );
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, softwareUpdateExecutionId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on SoftwareUpdateExecution"

		try:
			# get the SoftwareUpdateExecution from db
			softwareUpdateExecution = self.get( softwareUpdateExecutionId ).first()	
			
			# assign to None for unassignment
			softwareUpdateExecution.ioTDevice = None			

			#save it
			softwareUpdateExecution.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateExecutionId );
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution with id " + str(softwareUpdateExecutionId) + " does not exist.")
		except Exception:
			return None;
		
