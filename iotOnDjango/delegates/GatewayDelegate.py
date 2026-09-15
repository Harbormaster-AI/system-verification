
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.models.Site import Site
from iotOnDjango.models.Room import Room
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.EdgeApplication import EdgeApplication
from iotOnDjango.models.DeviceCertificate import DeviceCertificate
from iotOnDjango.models.DigitalTwin import DigitalTwin
from iotOnDjango.models.NetworkProfile import NetworkProfile
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Gateway
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class GatewayDelegate Declaration
#======================================================================
class GatewayDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, gatewayId ):
		try:	
			gateway = Gateway.objects.filter(id=gatewayId)
			return gateway.first();
		except Gateway.DoesNotExist:
			raise ProcessingError("Gateway with id " + str(gatewayId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, gateway):
		for model in serializers.deserialize("json", gateway):
			model.save()
			return model;

	def create(self, gateway):
		gateway.save()
		return gateway;

	def saveFromJson(self, gateway):
		for model in serializers.deserialize("json", gateway):
			model.save()
			return gateway;
	
	def save(self, gateway):
		gateway.save()
		return gateway;
	
	def delete(self, gatewayId ):
		errMsg = "Failed to delete Gateway from db using id " + str(gatewayId)
		
		try:
			gateway = Gateway.objects.get(id=gatewayId)
			gateway.delete()
			return True
		except Gateway.DoesNotExist:
			raise ProcessingError("Gateway with id " + str(gatewayId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Gateway.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Gateway from db")
		except Exception:
			return None;
		
	def assignSite( self, gatewayId, siteId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SiteDelegate import SiteDelegate

		errMsg = "Failed to assign element " + str(siteId) + " for Site on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# get the Site from db
			site = SiteDelegate().get(siteId).first();
			
			# assign the Site		
			gateway.site = site
			
			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSite( self, gatewayId ):
		errMsg = "Failed to unassign element " + str(siteId) + " for Site on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# assign to None for unassignment
			gateway.site = None			

			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
		
	def assignRoom( self, gatewayId, roomId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.RoomDelegate import RoomDelegate

		errMsg = "Failed to assign element " + str(roomId) + " for Room on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# get the Room from db
			room = RoomDelegate().get(roomId).first();
			
			# assign the Room		
			gateway.room = room
			
			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignRoom( self, gatewayId ):
		errMsg = "Failed to unassign element " + str(roomId) + " for Room on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# assign to None for unassignment
			gateway.room = None			

			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
		
	def assignDigitalTwin( self, gatewayId, digitalTwinId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DigitalTwinDelegate import DigitalTwinDelegate

		errMsg = "Failed to assign element " + str(digitalTwinId) + " for DigitalTwin on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# get the DigitalTwin from db
			digitalTwin = DigitalTwinDelegate().get(digitalTwinId).first();
			
			# assign the DigitalTwin		
			gateway.digitalTwin = digitalTwin
			
			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(digitalTwinId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDigitalTwin( self, gatewayId ):
		errMsg = "Failed to unassign element " + str(digitalTwinId) + " for DigitalTwin on Gateway"

		try:
			# get the Gateway from db
			gateway = self.get( gatewayId ).first()	
			
			# assign to None for unassignment
			gateway.digitalTwin = None			

			#save it
			gateway.save()

			# reload and return the appropriate version					
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
		
	def addDevices( self, gatewayId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to add elements " + str(devicesIds) + " for Devices on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				gateway.devices.add(ioTDevice)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDevices( self, gatewayId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to remove elements " + str(devicesIds) + " for Devices on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				gateway.devices.remove(ioTDevice)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addEdgeApplications( self, gatewayId, edgeApplicationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.EdgeApplicationDelegate import EdgeApplicationDelegate

		errMsg = "Failed to add elements " + str(edgeApplicationsIds) + " for EdgeApplications on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = edgeApplicationsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the EdgeApplication		
				edgeApplication = EdgeApplicationDelegate().get(id).first();	
				# add the EdgeApplication
				gateway.edgeApplications.add(edgeApplication)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except EdgeApplication.DoesNotExist:
			raise ProcessingError(errMsg + " : EdgeApplication does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeEdgeApplications( self, gatewayId, edgeApplicationsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.EdgeApplicationDelegate import EdgeApplicationDelegate

		errMsg = "Failed to remove elements " + str(edgeApplicationsIds) + " for EdgeApplications on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = edgeApplicationsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the EdgeApplication		
				edgeApplication = EdgeApplicationDelegate().get(id).first();	
				# add the EdgeApplication
				gateway.edgeApplications.remove(edgeApplication)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except EdgeApplication.DoesNotExist:
			raise ProcessingError(errMsg + " : EdgeApplication does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCertificates( self, gatewayId, certificatesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

		errMsg = "Failed to add elements " + str(certificatesIds) + " for Certificates on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = certificatesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceCertificate		
				deviceCertificate = DeviceCertificateDelegate().get(id).first();	
				# add the DeviceCertificate
				gateway.certificates.add(deviceCertificate)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCertificates( self, gatewayId, certificatesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

		errMsg = "Failed to remove elements " + str(certificatesIds) + " for Certificates on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = certificatesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceCertificate		
				deviceCertificate = DeviceCertificateDelegate().get(id).first();	
				# add the DeviceCertificate
				gateway.certificates.remove(deviceCertificate)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except DeviceCertificate.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceCertificate does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addNetworkProfiles( self, gatewayId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to add elements " + str(networkProfilesIds) + " for NetworkProfiles on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				gateway.networkProfiles.add(networkProfile)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeNetworkProfiles( self, gatewayId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to remove elements " + str(networkProfilesIds) + " for NetworkProfiles on Gateway"

		try:
			# get the Gateway
			gateway = self.get( gatewayId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				gateway.networkProfiles.remove(networkProfile)
				
			# save it		
			gateway.save()
			
			# reload and return the appropriate version
			return self.get( gatewayId );
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
