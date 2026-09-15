
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.FirmwareRelease import FirmwareRelease
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model FirmwareRelease
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FirmwareReleaseDelegate Declaration
#======================================================================
class FirmwareReleaseDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, firmwareReleaseId ):
		try:	
			firmwareRelease = FirmwareRelease.objects.filter(id=firmwareReleaseId)
			return firmwareRelease.first();
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError("FirmwareRelease with id " + str(firmwareReleaseId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, firmwareRelease):
		for model in serializers.deserialize("json", firmwareRelease):
			model.save()
			return model;

	def create(self, firmwareRelease):
		firmwareRelease.save()
		return firmwareRelease;

	def saveFromJson(self, firmwareRelease):
		for model in serializers.deserialize("json", firmwareRelease):
			model.save()
			return firmwareRelease;
	
	def save(self, firmwareRelease):
		firmwareRelease.save()
		return firmwareRelease;
	
	def delete(self, firmwareReleaseId ):
		errMsg = "Failed to delete FirmwareRelease from db using id " + str(firmwareReleaseId)
		
		try:
			firmwareRelease = FirmwareRelease.objects.get(id=firmwareReleaseId)
			firmwareRelease.delete()
			return True
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError("FirmwareRelease with id " + str(firmwareReleaseId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = FirmwareRelease.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all FirmwareRelease from db")
		except Exception:
			return None;
		
	def assignDeviceModel( self, firmwareReleaseId, deviceModelId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to assign element " + str(deviceModelId) + " for DeviceModel on FirmwareRelease"

		try:
			# get the FirmwareRelease from db
			firmwareRelease = self.get( firmwareReleaseId ).first()	
			
			# get the DeviceModel from db
			deviceModel = DeviceModelDelegate().get(deviceModelId).first();
			
			# assign the DeviceModel		
			firmwareRelease.deviceModel = deviceModel
			
			#save it
			firmwareRelease.save()

			# reload and return the appropriate version					
			return self.get( firmwareReleaseId );
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease with id " + str(firmwareReleaseId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDeviceModel( self, firmwareReleaseId ):
		errMsg = "Failed to unassign element " + str(deviceModelId) + " for DeviceModel on FirmwareRelease"

		try:
			# get the FirmwareRelease from db
			firmwareRelease = self.get( firmwareReleaseId ).first()	
			
			# assign to None for unassignment
			firmwareRelease.deviceModel = None			

			#save it
			firmwareRelease.save()

			# reload and return the appropriate version					
			return self.get( firmwareReleaseId );
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease with id " + str(firmwareReleaseId) + " does not exist.")
		except Exception:
			return None;
		
