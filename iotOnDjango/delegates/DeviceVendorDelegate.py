
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DeviceVendor import DeviceVendor
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.models.FirmwareRelease import FirmwareRelease
from iotOnDjango.models.HardwareModule import HardwareModule
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DeviceVendor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceVendorDelegate Declaration
#======================================================================
class DeviceVendorDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, deviceVendorId ):
		try:	
			deviceVendor = DeviceVendor.objects.filter(id=deviceVendorId)
			return deviceVendor.first();
		except DeviceVendor.DoesNotExist:
			raise ProcessingError("DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, deviceVendor):
		for model in serializers.deserialize("json", deviceVendor):
			model.save()
			return model;

	def create(self, deviceVendor):
		deviceVendor.save()
		return deviceVendor;

	def saveFromJson(self, deviceVendor):
		for model in serializers.deserialize("json", deviceVendor):
			model.save()
			return deviceVendor;
	
	def save(self, deviceVendor):
		deviceVendor.save()
		return deviceVendor;
	
	def delete(self, deviceVendorId ):
		errMsg = "Failed to delete DeviceVendor from db using id " + str(deviceVendorId)
		
		try:
			deviceVendor = DeviceVendor.objects.get(id=deviceVendorId)
			deviceVendor.delete()
			return True
		except DeviceVendor.DoesNotExist:
			raise ProcessingError("DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DeviceVendor.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DeviceVendor from db")
		except Exception:
			return None;
		
	def addDeviceModels( self, deviceVendorId, deviceModelsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to add elements " + str(deviceModelsIds) + " for DeviceModels on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = deviceModelsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceModel		
				deviceModel = DeviceModelDelegate().get(id).first();	
				# add the DeviceModel
				deviceVendor.deviceModels.add(deviceModel)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDeviceModels( self, deviceVendorId, deviceModelsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to remove elements " + str(deviceModelsIds) + " for DeviceModels on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = deviceModelsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceModel		
				deviceModel = DeviceModelDelegate().get(id).first();	
				# add the DeviceModel
				deviceVendor.deviceModels.remove(deviceModel)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addFirmwareReleases( self, deviceVendorId, firmwareReleasesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

		errMsg = "Failed to add elements " + str(firmwareReleasesIds) + " for FirmwareReleases on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = firmwareReleasesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FirmwareRelease		
				firmwareRelease = FirmwareReleaseDelegate().get(id).first();	
				# add the FirmwareRelease
				deviceVendor.firmwareReleases.add(firmwareRelease)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFirmwareReleases( self, deviceVendorId, firmwareReleasesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

		errMsg = "Failed to remove elements " + str(firmwareReleasesIds) + " for FirmwareReleases on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = firmwareReleasesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FirmwareRelease		
				firmwareRelease = FirmwareReleaseDelegate().get(id).first();	
				# add the FirmwareRelease
				deviceVendor.firmwareReleases.remove(firmwareRelease)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addHardwareModules( self, deviceVendorId, hardwareModulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

		errMsg = "Failed to add elements " + str(hardwareModulesIds) + " for HardwareModules on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = hardwareModulesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the HardwareModule		
				hardwareModule = HardwareModuleDelegate().get(id).first();	
				# add the HardwareModule
				deviceVendor.hardwareModules.add(hardwareModule)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeHardwareModules( self, deviceVendorId, hardwareModulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

		errMsg = "Failed to remove elements " + str(hardwareModulesIds) + " for HardwareModules on DeviceVendor"

		try:
			# get the DeviceVendor
			deviceVendor = self.get( deviceVendorId ).first()
				
			# split on a comma with no spaces
			idList = hardwareModulesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the HardwareModule		
				hardwareModule = HardwareModuleDelegate().get(id).first();	
				# add the HardwareModule
				deviceVendor.hardwareModules.remove(hardwareModule)
				
			# save it		
			deviceVendor.save()
			
			# reload and return the appropriate version
			return self.get( deviceVendorId );
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(deviceVendorId) + " does not exist.")
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
