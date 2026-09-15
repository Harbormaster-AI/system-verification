
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.DeviceCertificate import DeviceCertificate
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model DeviceCertificate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceCertificateDelegate Declaration
#======================================================================
class DeviceCertificateDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, deviceCertificateId ):
		try:	
			deviceCertificate = DeviceCertificate.objects.filter(id=deviceCertificateId)
			return deviceCertificate.first();
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError("DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, deviceCertificate):
		for model in serializers.deserialize("json", deviceCertificate):
			model.save()
			return model;

	def create(self, deviceCertificate):
		deviceCertificate.save()
		return deviceCertificate;

	def saveFromJson(self, deviceCertificate):
		for model in serializers.deserialize("json", deviceCertificate):
			model.save()
			return deviceCertificate;
	
	def save(self, deviceCertificate):
		deviceCertificate.save()
		return deviceCertificate;
	
	def delete(self, deviceCertificateId ):
		errMsg = "Failed to delete DeviceCertificate from db using id " + str(deviceCertificateId)
		
		try:
			deviceCertificate = DeviceCertificate.objects.get(id=deviceCertificateId)
			deviceCertificate.delete()
			return True
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError("DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = DeviceCertificate.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all DeviceCertificate from db")
		except Exception:
			return None;
		
	def assignDevice( self, deviceCertificateId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on DeviceCertificate"

		try:
			# get the DeviceCertificate from db
			deviceCertificate = self.get( deviceCertificateId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			deviceCertificate.device = ioTDevice
			
			#save it
			deviceCertificate.save()

			# reload and return the appropriate version					
			return self.get( deviceCertificateId );
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, deviceCertificateId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on DeviceCertificate"

		try:
			# get the DeviceCertificate from db
			deviceCertificate = self.get( deviceCertificateId ).first()	
			
			# assign to None for unassignment
			deviceCertificate.ioTDevice = None			

			#save it
			deviceCertificate.save()

			# reload and return the appropriate version					
			return self.get( deviceCertificateId );
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except Exception:
			return None;
		
	def assignGateway( self, deviceCertificateId, gatewayId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to assign element " + str(gatewayId) + " for Gateway on DeviceCertificate"

		try:
			# get the DeviceCertificate from db
			deviceCertificate = self.get( deviceCertificateId ).first()	
			
			# get the Gateway from db
			gateway = GatewayDelegate().get(gatewayId).first();
			
			# assign the Gateway		
			deviceCertificate.gateway = gateway
			
			#save it
			deviceCertificate.save()

			# reload and return the appropriate version					
			return self.get( deviceCertificateId );
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignGateway( self, deviceCertificateId ):
		errMsg = "Failed to unassign element " + str(gatewayId) + " for Gateway on DeviceCertificate"

		try:
			# get the DeviceCertificate from db
			deviceCertificate = self.get( deviceCertificateId ).first()	
			
			# assign to None for unassignment
			deviceCertificate.gateway = None			

			#save it
			deviceCertificate.save()

			# reload and return the appropriate version					
			return self.get( deviceCertificateId );
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate with id " + str(deviceCertificateId) + " does not exist.")
		except Exception:
			return None;
		
