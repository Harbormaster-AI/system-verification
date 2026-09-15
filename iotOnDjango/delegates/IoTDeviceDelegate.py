
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.Site import Site
from iotOnDjango.models.Room import Room
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.models.SensorInstance import SensorInstance
from iotOnDjango.models.ActuatorInstance import ActuatorInstance
from iotOnDjango.models.DeviceCertificate import DeviceCertificate
from iotOnDjango.models.DigitalTwin import DigitalTwin
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.models.CommandInvocation import CommandInvocation
from iotOnDjango.models.Alert import Alert
from iotOnDjango.models.ProvisioningRecord import ProvisioningRecord
from iotOnDjango.models.DeviceGroup import DeviceGroup
from iotOnDjango.models.NetworkProfile import NetworkProfile
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model IoTDevice
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class IoTDeviceDelegate Declaration
#======================================================================
class IoTDeviceDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, ioTDeviceId ):
		try:	
			ioTDevice = IoTDevice.objects.filter(id=ioTDeviceId)
			return ioTDevice.first();
		except IoTDevice.DoesNotExist:
			raise ProcessingError("IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, ioTDevice):
		for model in serializers.deserialize("json", ioTDevice):
			model.save()
			return model;

	def create(self, ioTDevice):
		ioTDevice.save()
		return ioTDevice;

	def saveFromJson(self, ioTDevice):
		for model in serializers.deserialize("json", ioTDevice):
			model.save()
			return ioTDevice;
	
	def save(self, ioTDevice):
		ioTDevice.save()
		return ioTDevice;
	
	def delete(self, ioTDeviceId ):
		errMsg = "Failed to delete IoTDevice from db using id " + str(ioTDeviceId)
		
		try:
			ioTDevice = IoTDevice.objects.get(id=ioTDeviceId)
			ioTDevice.delete()
			return True
		except IoTDevice.DoesNotExist:
			raise ProcessingError("IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = IoTDevice.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all IoTDevice from db")
		except Exception:
			return None;
		
	def assignDeviceModel( self, ioTDeviceId, deviceModelId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to assign element " + str(deviceModelId) + " for DeviceModel on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the DeviceModel from db
			deviceModel = DeviceModelDelegate().get(deviceModelId).first();
			
			# assign the DeviceModel		
			ioTDevice.deviceModel = deviceModel
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel with id " + str(deviceModelId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDeviceModel( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(deviceModelId) + " for DeviceModel on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.deviceModel = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTenant( self, ioTDeviceId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			ioTDevice.tenant = tenant
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.tenant = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignSite( self, ioTDeviceId, siteId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SiteDelegate import SiteDelegate

		errMsg = "Failed to assign element " + str(siteId) + " for Site on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the Site from db
			site = SiteDelegate().get(siteId).first();
			
			# assign the Site		
			ioTDevice.site = site
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSite( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(siteId) + " for Site on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.site = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignRoom( self, ioTDeviceId, roomId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.RoomDelegate import RoomDelegate

		errMsg = "Failed to assign element " + str(roomId) + " for Room on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the Room from db
			room = RoomDelegate().get(roomId).first();
			
			# assign the Room		
			ioTDevice.room = room
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignRoom( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(roomId) + " for Room on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.room = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignGateway( self, ioTDeviceId, gatewayId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to assign element " + str(gatewayId) + " for Gateway on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the Gateway from db
			gateway = GatewayDelegate().get(gatewayId).first();
			
			# assign the Gateway		
			ioTDevice.gateway = gateway
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignGateway( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(gatewayId) + " for Gateway on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.gateway = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDigitalTwin( self, ioTDeviceId, digitalTwinId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DigitalTwinDelegate import DigitalTwinDelegate

		errMsg = "Failed to assign element " + str(digitalTwinId) + " for DigitalTwin on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the DigitalTwin from db
			digitalTwin = DigitalTwinDelegate().get(digitalTwinId).first();
			
			# assign the DigitalTwin		
			ioTDevice.digitalTwin = digitalTwin
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDigitalTwin( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(digitalTwinId) + " for DigitalTwin on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.digitalTwin = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def assignProvisioningRecord( self, ioTDeviceId, provisioningRecordId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ProvisioningRecordDelegate import ProvisioningRecordDelegate

		errMsg = "Failed to assign element " + str(provisioningRecordId) + " for ProvisioningRecord on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# get the ProvisioningRecord from db
			provisioningRecord = ProvisioningRecordDelegate().get(provisioningRecordId).first();
			
			# assign the ProvisioningRecord		
			ioTDevice.provisioningRecord = provisioningRecord
			
			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except ProvisioningRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : ProvisioningRecord with id " + str(provisioningRecordId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignProvisioningRecord( self, ioTDeviceId ):
		errMsg = "Failed to unassign element " + str(provisioningRecordId) + " for ProvisioningRecord on IoTDevice"

		try:
			# get the IoTDevice from db
			ioTDevice = self.get( ioTDeviceId ).first()	
			
			# assign to None for unassignment
			ioTDevice.provisioningRecord = None			

			#save it
			ioTDevice.save()

			# reload and return the appropriate version					
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Exception:
			return None;
		
	def addSensors( self, ioTDeviceId, sensorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SensorInstanceDelegate import SensorInstanceDelegate

		errMsg = "Failed to add elements " + str(sensorsIds) + " for Sensors on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = sensorsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the SensorInstance		
				sensorInstance = SensorInstanceDelegate().get(id).first();	
				# add the SensorInstance
				ioTDevice.sensors.add(sensorInstance)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeSensors( self, ioTDeviceId, sensorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SensorInstanceDelegate import SensorInstanceDelegate

		errMsg = "Failed to remove elements " + str(sensorsIds) + " for Sensors on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = sensorsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the SensorInstance		
				sensorInstance = SensorInstanceDelegate().get(id).first();	
				# add the SensorInstance
				ioTDevice.sensors.remove(sensorInstance)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except SensorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : SensorInstance does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addActuators( self, ioTDeviceId, actuatorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

		errMsg = "Failed to add elements " + str(actuatorsIds) + " for Actuators on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = actuatorsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ActuatorInstance		
				actuatorInstance = ActuatorInstanceDelegate().get(id).first();	
				# add the ActuatorInstance
				ioTDevice.actuators.add(actuatorInstance)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeActuators( self, ioTDeviceId, actuatorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

		errMsg = "Failed to remove elements " + str(actuatorsIds) + " for Actuators on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = actuatorsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ActuatorInstance		
				actuatorInstance = ActuatorInstanceDelegate().get(id).first();	
				# add the ActuatorInstance
				ioTDevice.actuators.remove(actuatorInstance)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except ActuatorInstance.DoesNotExist:
			raise ProcessingError(errMsg + " : ActuatorInstance does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCertificates( self, ioTDeviceId, certificatesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

		errMsg = "Failed to add elements " + str(certificatesIds) + " for Certificates on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = certificatesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceCertificate		
				deviceCertificate = DeviceCertificateDelegate().get(id).first();	
				# add the DeviceCertificate
				ioTDevice.certificates.add(deviceCertificate)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCertificates( self, ioTDeviceId, certificatesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

		errMsg = "Failed to remove elements " + str(certificatesIds) + " for Certificates on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = certificatesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceCertificate		
				deviceCertificate = DeviceCertificateDelegate().get(id).first();	
				# add the DeviceCertificate
				ioTDevice.certificates.remove(deviceCertificate)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addTelemetryStreams( self, ioTDeviceId, telemetryStreamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(telemetryStreamsIds) + " for TelemetryStreams on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = telemetryStreamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				ioTDevice.telemetryStreams.add(telemetryStream)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeTelemetryStreams( self, ioTDeviceId, telemetryStreamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(telemetryStreamsIds) + " for TelemetryStreams on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = telemetryStreamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				ioTDevice.telemetryStreams.remove(telemetryStream)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCommandInvocations( self, ioTDeviceId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to add elements " + str(commandInvocationsIds) + " for CommandInvocations on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				ioTDevice.commandInvocations.add(commandInvocation)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCommandInvocations( self, ioTDeviceId, commandInvocationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

		errMsg = "Failed to remove elements " + str(commandInvocationsIds) + " for CommandInvocations on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = commandInvocationsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the CommandInvocation		
				commandInvocation = CommandInvocationDelegate().get(id).first();	
				# add the CommandInvocation
				ioTDevice.commandInvocations.remove(commandInvocation)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except CommandInvocation.DoesNotExist:
			raise ProcessingError(errMsg + " : CommandInvocation does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAlerts( self, ioTDeviceId, alertsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertDelegate import AlertDelegate

		errMsg = "Failed to add elements " + str(alertsIds) + " for Alerts on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = alertsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Alert		
				alert = AlertDelegate().get(id).first();	
				# add the Alert
				ioTDevice.alerts.add(alert)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAlerts( self, ioTDeviceId, alertsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertDelegate import AlertDelegate

		errMsg = "Failed to remove elements " + str(alertsIds) + " for Alerts on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = alertsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Alert		
				alert = AlertDelegate().get(id).first();	
				# add the Alert
				ioTDevice.alerts.remove(alert)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDeviceGroups( self, ioTDeviceId, deviceGroupsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

		errMsg = "Failed to add elements " + str(deviceGroupsIds) + " for DeviceGroups on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = deviceGroupsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceGroup		
				deviceGroup = DeviceGroupDelegate().get(id).first();	
				# add the DeviceGroup
				ioTDevice.deviceGroups.add(deviceGroup)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDeviceGroups( self, ioTDeviceId, deviceGroupsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

		errMsg = "Failed to remove elements " + str(deviceGroupsIds) + " for DeviceGroups on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = deviceGroupsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceGroup		
				deviceGroup = DeviceGroupDelegate().get(id).first();	
				# add the DeviceGroup
				ioTDevice.deviceGroups.remove(deviceGroup)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addNetworkProfiles( self, ioTDeviceId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to add elements " + str(networkProfilesIds) + " for NetworkProfiles on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				ioTDevice.networkProfiles.add(networkProfile)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeNetworkProfiles( self, ioTDeviceId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to remove elements " + str(networkProfilesIds) + " for NetworkProfiles on IoTDevice"

		try:
			# get the IoTDevice
			ioTDevice = self.get( ioTDeviceId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				ioTDevice.networkProfiles.remove(networkProfile)
				
			# save it		
			ioTDevice.save()
			
			# reload and return the appropriate version
			return self.get( ioTDeviceId );
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(ioTDeviceId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
