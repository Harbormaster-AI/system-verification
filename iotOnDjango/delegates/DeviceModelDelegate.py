
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.models.DeviceVendor import DeviceVendor
from iotOnDjango.models.HardwareModule import HardwareModule
from iotOnDjango.models.TwinTemplate import TwinTemplate
from iotOnDjango.models.FirmwareRelease import FirmwareRelease
from iotOnDjango.models.CommandDefinition import CommandDefinition
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DeviceModel
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceModelDelegate Declaration
#======================================================================
class DeviceModelDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, deviceModelId ):
		try:	
			deviceModel = DeviceModel.objects.filter(id=deviceModelId)
			return deviceModel.first();
		except DeviceModel.DoesNotExist:
			raise ProcessingError("DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, deviceModel):
		for model in serializers.deserialize("json", deviceModel):
			model.save()
			return model;

	def create(self, deviceModel):
		deviceModel.save()
		return deviceModel;

	def saveFromJson(self, deviceModel):
		for model in serializers.deserialize("json", deviceModel):
			model.save()
			return deviceModel;
	
	def save(self, deviceModel):
		deviceModel.save()
		return deviceModel;
	
	def delete(self, deviceModelId ):
		errMsg = "Failed to delete DeviceModel from db using id " + str(deviceModelId)
		
		try:
			deviceModel = DeviceModel.objects.get(id=deviceModelId)
			deviceModel.delete()
			return True
		except DeviceModel.DoesNotExist:
			raise ProcessingError("DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DeviceModel.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DeviceModel from db")
		except Exception:
			return None;
		
	def assignVendor( self, deviceModelId, vendorId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceVendorDelegate import DeviceVendorDelegate

		errMsg = "Failed to assign element " + str(vendorId) + " for Vendor on DeviceModel"

		try:
			# get the DeviceModel from db
			deviceModel = self.get( deviceModelId ).first()	
			
			# get the DeviceVendor from db
			deviceVendor = DeviceVendorDelegate().get(vendorId).first();
			
			# assign the Vendor		
			deviceModel.vendor = deviceVendor
			
			#save it
			deviceModel.save()

			# reload and return the appropriate version					
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(vendorId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignVendor( self, deviceModelId ):
		errMsg = "Failed to unassign element " + str(vendorId) + " for Vendor on DeviceModel"

		try:
			# get the DeviceModel from db
			deviceModel = self.get( deviceModelId ).first()	
			
			# assign to None for unassignment
			deviceModel.deviceVendor = None			

			#save it
			deviceModel.save()

			# reload and return the appropriate version					
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTwinTemplate( self, deviceModelId, twinTemplateId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TwinTemplateDelegate import TwinTemplateDelegate

		errMsg = "Failed to assign element " + str(twinTemplateId) + " for TwinTemplate on DeviceModel"

		try:
			# get the DeviceModel from db
			deviceModel = self.get( deviceModelId ).first()	
			
			# get the TwinTemplate from db
			twinTemplate = TwinTemplateDelegate().get(twinTemplateId).first();
			
			# assign the TwinTemplate		
			deviceModel.twinTemplate = twinTemplate
			
			#save it
			deviceModel.save()

			# reload and return the appropriate version					
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except TwinTemplate.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinTemplate with id " + str(twinTemplateId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTwinTemplate( self, deviceModelId ):
		errMsg = "Failed to unassign element " + str(twinTemplateId) + " for TwinTemplate on DeviceModel"

		try:
			# get the DeviceModel from db
			deviceModel = self.get( deviceModelId ).first()	
			
			# assign to None for unassignment
			deviceModel.twinTemplate = None			

			#save it
			deviceModel.save()

			# reload and return the appropriate version					
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except Exception:
			return None;
		
	def addHardwareModules( self, deviceModelId, hardwareModulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

		errMsg = "Failed to add elements " + str(hardwareModulesIds) + " for HardwareModules on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = hardwareModulesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the HardwareModule		
				hardwareModule = HardwareModuleDelegate().get(id).first();	
				# add the HardwareModule
				deviceModel.hardwareModules.add(hardwareModule)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeHardwareModules( self, deviceModelId, hardwareModulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

		errMsg = "Failed to remove elements " + str(hardwareModulesIds) + " for HardwareModules on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = hardwareModulesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the HardwareModule		
				hardwareModule = HardwareModuleDelegate().get(id).first();	
				# add the HardwareModule
				deviceModel.hardwareModules.remove(hardwareModule)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addFirmwareReleases( self, deviceModelId, firmwareReleasesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

		errMsg = "Failed to add elements " + str(firmwareReleasesIds) + " for FirmwareReleases on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = firmwareReleasesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FirmwareRelease		
				firmwareRelease = FirmwareReleaseDelegate().get(id).first();	
				# add the FirmwareRelease
				deviceModel.firmwareReleases.add(firmwareRelease)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFirmwareReleases( self, deviceModelId, firmwareReleasesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

		errMsg = "Failed to remove elements " + str(firmwareReleasesIds) + " for FirmwareReleases on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = firmwareReleasesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FirmwareRelease		
				firmwareRelease = FirmwareReleaseDelegate().get(id).first();	
				# add the FirmwareRelease
				deviceModel.firmwareReleases.remove(firmwareRelease)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except FirmwareRelease.DoesNotExist:
			raise ProcessingError(errMsg + " : FirmwareRelease does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCommandDefinitions( self, deviceModelId, commandDefinitionsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

		errMsg = "Failed to add elements " + str(commandDefinitionsIds) + " for CommandDefinitions on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = commandDefinitionsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the CommandDefinition		
				commandDefinition = CommandDefinitionDelegate().get(id).first();	
				# add the CommandDefinition
				deviceModel.commandDefinitions.add(commandDefinition)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCommandDefinitions( self, deviceModelId, commandDefinitionsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

		errMsg = "Failed to remove elements " + str(commandDefinitionsIds) + " for CommandDefinitions on DeviceModel"

		try:
			# get the DeviceModel
			deviceModel = self.get( deviceModelId ).first()
				
			# split on a comma with no spaces
			idList = commandDefinitionsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the CommandDefinition		
				commandDefinition = CommandDefinitionDelegate().get(id).first();	
				# add the CommandDefinition
				deviceModel.commandDefinitions.remove(commandDefinition)
				
			# save it		
			deviceModel.save()
			
			# reload and return the appropriate version
			return self.get( deviceModelId );
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except CommandDefinition.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandDefinition does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
