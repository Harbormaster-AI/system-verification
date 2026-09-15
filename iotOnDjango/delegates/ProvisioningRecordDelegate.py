
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.ProvisioningRecord import ProvisioningRecord
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.DeviceCertificate import DeviceCertificate
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ProvisioningRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProvisioningRecordDelegate Declaration
#======================================================================
class ProvisioningRecordDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, provisioningRecordId ):
		try:	
			provisioningRecord = ProvisioningRecord.objects.filter(id=provisioningRecordId)
			return provisioningRecord.first();
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError("ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, provisioningRecord):
		for model in serializers.deserialize("json", provisioningRecord):
			model.save()
			return model;

	def create(self, provisioningRecord):
		provisioningRecord.save()
		return provisioningRecord;

	def saveFromJson(self, provisioningRecord):
		for model in serializers.deserialize("json", provisioningRecord):
			model.save()
			return provisioningRecord;
	
	def save(self, provisioningRecord):
		provisioningRecord.save()
		return provisioningRecord;
	
	def delete(self, provisioningRecordId ):
		errMsg = "Failed to delete ProvisioningRecord from db using id " + str(provisioningRecordId)
		
		try:
			provisioningRecord = ProvisioningRecord.objects.get(id=provisioningRecordId)
			provisioningRecord.delete()
			return True
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError("ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ProvisioningRecord.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ProvisioningRecord from db")
		except Exception:
			return None;
		
	def assignDevice( self, provisioningRecordId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			provisioningRecord.device = ioTDevice
			
			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, provisioningRecordId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# assign to None for unassignment
			provisioningRecord.ioTDevice = None			

			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except Exception:
			return None;
		
	def assignCertificate( self, provisioningRecordId, certificateId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

		errMsg = "Failed to assign element " + str(certificateId) + " for Certificate on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# get the DeviceCertificate from db
			deviceCertificate = DeviceCertificateDelegate().get(certificateId).first();
			
			# assign the Certificate		
			provisioningRecord.certificate = deviceCertificate
			
			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate with id " + str(certificateId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCertificate( self, provisioningRecordId ):
		errMsg = "Failed to unassign element " + str(certificateId) + " for Certificate on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# assign to None for unassignment
			provisioningRecord.deviceCertificate = None			

			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTenant( self, provisioningRecordId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			provisioningRecord.tenant = tenant
			
			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, provisioningRecordId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on ProvisioningRecord"

		try:
			# get the ProvisioningRecord from db
			provisioningRecord = self.get( provisioningRecordId ).first()	
			
			# assign to None for unassignment
			provisioningRecord.tenant = None			

			#save it
			provisioningRecord.save()

			# reload and return the appropriate version					
			return self.get( provisioningRecordId );
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except Exception:
			return None;
		
