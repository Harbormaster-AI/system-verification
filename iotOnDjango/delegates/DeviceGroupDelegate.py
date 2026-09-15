
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DeviceGroup import DeviceGroup
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DeviceGroup
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceGroupDelegate Declaration
#======================================================================
class DeviceGroupDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, deviceGroupId ):
		try:	
			deviceGroup = DeviceGroup.objects.filter(id=deviceGroupId)
			return deviceGroup.first();
		except DeviceGroup.DoesNotExist:
			raise ProcessingError("DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, deviceGroup):
		for model in serializers.deserialize("json", deviceGroup):
			model.save()
			return model;

	def create(self, deviceGroup):
		deviceGroup.save()
		return deviceGroup;

	def saveFromJson(self, deviceGroup):
		for model in serializers.deserialize("json", deviceGroup):
			model.save()
			return deviceGroup;
	
	def save(self, deviceGroup):
		deviceGroup.save()
		return deviceGroup;
	
	def delete(self, deviceGroupId ):
		errMsg = "Failed to delete DeviceGroup from db using id " + str(deviceGroupId)
		
		try:
			deviceGroup = DeviceGroup.objects.get(id=deviceGroupId)
			deviceGroup.delete()
			return True
		except DeviceGroup.DoesNotExist:
			raise ProcessingError("DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DeviceGroup.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DeviceGroup from db")
		except Exception:
			return None;
		
	def assignTenant( self, deviceGroupId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on DeviceGroup"

		try:
			# get the DeviceGroup from db
			deviceGroup = self.get( deviceGroupId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			deviceGroup.tenant = tenant
			
			#save it
			deviceGroup.save()

			# reload and return the appropriate version					
			return self.get( deviceGroupId );
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, deviceGroupId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on DeviceGroup"

		try:
			# get the DeviceGroup from db
			deviceGroup = self.get( deviceGroupId ).first()	
			
			# assign to None for unassignment
			deviceGroup.tenant = None			

			#save it
			deviceGroup.save()

			# reload and return the appropriate version					
			return self.get( deviceGroupId );
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except Exception:
			return None;
		
	def addDevices( self, deviceGroupId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to add elements " + str(devicesIds) + " for Devices on DeviceGroup"

		try:
			# get the DeviceGroup
			deviceGroup = self.get( deviceGroupId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				deviceGroup.devices.add(ioTDevice)
				
			# save it		
			deviceGroup.save()
			
			# reload and return the appropriate version
			return self.get( deviceGroupId );
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDevices( self, deviceGroupId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to remove elements " + str(devicesIds) + " for Devices on DeviceGroup"

		try:
			# get the DeviceGroup
			deviceGroup = self.get( deviceGroupId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				deviceGroup.devices.remove(ioTDevice)
				
			# save it		
			deviceGroup.save()
			
			# reload and return the appropriate version
			return self.get( deviceGroupId );
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup with id " + str(deviceGroupId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
