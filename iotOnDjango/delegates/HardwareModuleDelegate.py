
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.HardwareModule import HardwareModule
from iotOnDjango.models.DeviceVendor import DeviceVendor
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model HardwareModule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class HardwareModuleDelegate Declaration
#======================================================================
class HardwareModuleDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, hardwareModuleId ):
		try:	
			hardwareModule = HardwareModule.objects.filter(id=hardwareModuleId)
			return hardwareModule.first();
		except HardwareModule.DoesNotExist:
			raise ProcessingError("HardwareModule with id " + str(hardwareModuleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, hardwareModule):
		for model in serializers.deserialize("json", hardwareModule):
			model.save()
			return model;

	def create(self, hardwareModule):
		hardwareModule.save()
		return hardwareModule;

	def saveFromJson(self, hardwareModule):
		for model in serializers.deserialize("json", hardwareModule):
			model.save()
			return hardwareModule;
	
	def save(self, hardwareModule):
		hardwareModule.save()
		return hardwareModule;
	
	def delete(self, hardwareModuleId ):
		errMsg = "Failed to delete HardwareModule from db using id " + str(hardwareModuleId)
		
		try:
			hardwareModule = HardwareModule.objects.get(id=hardwareModuleId)
			hardwareModule.delete()
			return True
		except HardwareModule.DoesNotExist:
			raise ProcessingError("HardwareModule with id " + str(hardwareModuleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = HardwareModule.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all HardwareModule from db")
		except Exception:
			return None;
		
	def assignVendor( self, hardwareModuleId, vendorId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceVendorDelegate import DeviceVendorDelegate

		errMsg = "Failed to assign element " + str(vendorId) + " for Vendor on HardwareModule"

		try:
			# get the HardwareModule from db
			hardwareModule = self.get( hardwareModuleId ).first()	
			
			# get the DeviceVendor from db
			deviceVendor = DeviceVendorDelegate().get(vendorId).first();
			
			# assign the Vendor		
			hardwareModule.vendor = deviceVendor
			
			#save it
			hardwareModule.save()

			# reload and return the appropriate version					
			return self.get( hardwareModuleId );
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule with id " + str(hardwareModuleId) + " does not exist.")
		except DeviceVendor.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceVendor with id " + str(vendorId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignVendor( self, hardwareModuleId ):
		errMsg = "Failed to unassign element " + str(vendorId) + " for Vendor on HardwareModule"

		try:
			# get the HardwareModule from db
			hardwareModule = self.get( hardwareModuleId ).first()	
			
			# assign to None for unassignment
			hardwareModule.deviceVendor = None			

			#save it
			hardwareModule.save()

			# reload and return the appropriate version					
			return self.get( hardwareModuleId );
		except HardwareModule.DoesNotExist:
			raise ProcessingError(errMsg + " : HardwareModule with id " + str(hardwareModuleId) + " does not exist.")
		except Exception:
			return None;
		
