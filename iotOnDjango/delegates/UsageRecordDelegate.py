
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.UsageRecord import UsageRecord
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.ConnectivityPlan import ConnectivityPlan
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model UsageRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class UsageRecordDelegate Declaration
#======================================================================
class UsageRecordDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, usageRecordId ):
		try:	
			usageRecord = UsageRecord.objects.filter(id=usageRecordId)
			return usageRecord.first();
		except UsageRecord.DoesNotExist:
			raise ProcessingError("UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, usageRecord):
		for model in serializers.deserialize("json", usageRecord):
			model.save()
			return model;

	def create(self, usageRecord):
		usageRecord.save()
		return usageRecord;

	def saveFromJson(self, usageRecord):
		for model in serializers.deserialize("json", usageRecord):
			model.save()
			return usageRecord;
	
	def save(self, usageRecord):
		usageRecord.save()
		return usageRecord;
	
	def delete(self, usageRecordId ):
		errMsg = "Failed to delete UsageRecord from db using id " + str(usageRecordId)
		
		try:
			usageRecord = UsageRecord.objects.get(id=usageRecordId)
			usageRecord.delete()
			return True
		except UsageRecord.DoesNotExist:
			raise ProcessingError("UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = UsageRecord.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all UsageRecord from db")
		except Exception:
			return None;
		
	def assignTenant( self, usageRecordId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			usageRecord.tenant = tenant
			
			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, usageRecordId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# assign to None for unassignment
			usageRecord.tenant = None			

			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDevice( self, usageRecordId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			usageRecord.device = ioTDevice
			
			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, usageRecordId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# assign to None for unassignment
			usageRecord.ioTDevice = None			

			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except Exception:
			return None;
		
	def assignConnectivityPlan( self, usageRecordId, connectivityPlanId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

		errMsg = "Failed to assign element " + str(connectivityPlanId) + " for ConnectivityPlan on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# get the ConnectivityPlan from db
			connectivityPlan = ConnectivityPlanDelegate().get(connectivityPlanId).first();
			
			# assign the ConnectivityPlan		
			usageRecord.connectivityPlan = connectivityPlan
			
			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignConnectivityPlan( self, usageRecordId ):
		errMsg = "Failed to unassign element " + str(connectivityPlanId) + " for ConnectivityPlan on UsageRecord"

		try:
			# get the UsageRecord from db
			usageRecord = self.get( usageRecordId ).first()	
			
			# assign to None for unassignment
			usageRecord.connectivityPlan = None			

			#save it
			usageRecord.save()

			# reload and return the appropriate version					
			return self.get( usageRecordId );
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord with id " + str(usageRecordId) + " does not exist.")
		except Exception:
			return None;
		
