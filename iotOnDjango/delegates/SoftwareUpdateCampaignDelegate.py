
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.SoftwareUpdateCampaign import SoftwareUpdateCampaign
from iotOnDjango.models.FirmwareRelease import FirmwareRelease
from iotOnDjango.models.DeviceGroup import DeviceGroup
from iotOnDjango.models.SoftwareUpdateExecution import SoftwareUpdateExecution
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model SoftwareUpdateCampaign
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateCampaignDelegate Declaration
#======================================================================
class SoftwareUpdateCampaignDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, softwareUpdateCampaignId ):
		try:	
			softwareUpdateCampaign = SoftwareUpdateCampaign.objects.filter(id=softwareUpdateCampaignId)
			return softwareUpdateCampaign.first();
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError("SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, softwareUpdateCampaign):
		for model in serializers.deserialize("json", softwareUpdateCampaign):
			model.save()
			return model;

	def create(self, softwareUpdateCampaign):
		softwareUpdateCampaign.save()
		return softwareUpdateCampaign;

	def saveFromJson(self, softwareUpdateCampaign):
		for model in serializers.deserialize("json", softwareUpdateCampaign):
			model.save()
			return softwareUpdateCampaign;
	
	def save(self, softwareUpdateCampaign):
		softwareUpdateCampaign.save()
		return softwareUpdateCampaign;
	
	def delete(self, softwareUpdateCampaignId ):
		errMsg = "Failed to delete SoftwareUpdateCampaign from db using id " + str(softwareUpdateCampaignId)
		
		try:
			softwareUpdateCampaign = SoftwareUpdateCampaign.objects.get(id=softwareUpdateCampaignId)
			softwareUpdateCampaign.delete()
			return True
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError("SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = SoftwareUpdateCampaign.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all SoftwareUpdateCampaign from db")
		except Exception:
			return None;
		
	def assignFirmwareRelease( self, softwareUpdateCampaignId, firmwareReleaseId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

		errMsg = "Failed to assign element " + str(firmwareReleaseId) + " for FirmwareRelease on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign from db
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()	
			
			# get the FirmwareRelease from db
			firmwareRelease = FirmwareReleaseDelegate().get(firmwareReleaseId).first();
			
			# assign the FirmwareRelease		
			softwareUpdateCampaign.firmwareRelease = firmwareRelease
			
			#save it
			softwareUpdateCampaign.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease with id " + str(firmwareReleaseId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFirmwareRelease( self, softwareUpdateCampaignId ):
		errMsg = "Failed to unassign element " + str(firmwareReleaseId) + " for FirmwareRelease on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign from db
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()	
			
			# assign to None for unassignment
			softwareUpdateCampaign.firmwareRelease = None			

			#save it
			softwareUpdateCampaign.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDeviceGroup( self, softwareUpdateCampaignId, deviceGroupId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

		errMsg = "Failed to assign element " + str(deviceGroupId) + " for DeviceGroup on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign from db
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()	
			
			# get the DeviceGroup from db
			deviceGroup = DeviceGroupDelegate().get(deviceGroupId).first();
			
			# assign the DeviceGroup		
			softwareUpdateCampaign.deviceGroup = deviceGroup
			
			#save it
			softwareUpdateCampaign.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDeviceGroup( self, softwareUpdateCampaignId ):
		errMsg = "Failed to unassign element " + str(deviceGroupId) + " for DeviceGroup on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign from db
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()	
			
			# assign to None for unassignment
			softwareUpdateCampaign.deviceGroup = None			

			#save it
			softwareUpdateCampaign.save()

			# reload and return the appropriate version					
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except Exception:
			return None;
		
	def addExecutions( self, softwareUpdateCampaignId, executionsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SoftwareUpdateExecutionDelegate import SoftwareUpdateExecutionDelegate

		errMsg = "Failed to add elements " + str(executionsIds) + " for Executions on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()
				
			# split on a comma with no spaces
			idList = executionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the SoftwareUpdateExecution		
				softwareUpdateExecution = SoftwareUpdateExecutionDelegate().get(id).first();	
				# add the SoftwareUpdateExecution
				softwareUpdateCampaign.executions.add(softwareUpdateExecution)
				
			# save it		
			softwareUpdateCampaign.save()
			
			# reload and return the appropriate version
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeExecutions( self, softwareUpdateCampaignId, executionsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SoftwareUpdateExecutionDelegate import SoftwareUpdateExecutionDelegate

		errMsg = "Failed to remove elements " + str(executionsIds) + " for Executions on SoftwareUpdateCampaign"

		try:
			# get the SoftwareUpdateCampaign
			softwareUpdateCampaign = self.get( softwareUpdateCampaignId ).first()
				
			# split on a comma with no spaces
			idList = executionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the SoftwareUpdateExecution		
				softwareUpdateExecution = SoftwareUpdateExecutionDelegate().get(id).first();	
				# add the SoftwareUpdateExecution
				softwareUpdateCampaign.executions.remove(softwareUpdateExecution)
				
			# save it		
			softwareUpdateCampaign.save()
			
			# reload and return the appropriate version
			return self.get( softwareUpdateCampaignId );
		except SoftwareUpdateCampaign.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateCampaign with id " + str(softwareUpdateCampaignId) + " does not exist.")
		except SoftwareUpdateExecution.DoesNotExist:
			raise ProcessingError(errMsg + " : SoftwareUpdateExecution does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
