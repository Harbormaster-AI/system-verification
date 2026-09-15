
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.NetworkProfile import NetworkProfile
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.models.SimCard import SimCard
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model NetworkProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class NetworkProfileDelegate Declaration
#======================================================================
class NetworkProfileDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, networkProfileId ):
		try:	
			networkProfile = NetworkProfile.objects.filter(id=networkProfileId)
			return networkProfile.first();
		except NetworkProfile.DoesNotExist:
			raise ProcessingError("NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, networkProfile):
		for model in serializers.deserialize("json", networkProfile):
			model.save()
			return model;

	def create(self, networkProfile):
		networkProfile.save()
		return networkProfile;

	def saveFromJson(self, networkProfile):
		for model in serializers.deserialize("json", networkProfile):
			model.save()
			return networkProfile;
	
	def save(self, networkProfile):
		networkProfile.save()
		return networkProfile;
	
	def delete(self, networkProfileId ):
		errMsg = "Failed to delete NetworkProfile from db using id " + str(networkProfileId)
		
		try:
			networkProfile = NetworkProfile.objects.get(id=networkProfileId)
			networkProfile.delete()
			return True
		except NetworkProfile.DoesNotExist:
			raise ProcessingError("NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = NetworkProfile.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all NetworkProfile from db")
		except Exception:
			return None;
		
	def assignDevice( self, networkProfileId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			networkProfile.device = ioTDevice
			
			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, networkProfileId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# assign to None for unassignment
			networkProfile.ioTDevice = None			

			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except Exception:
			return None;
		
	def assignGateway( self, networkProfileId, gatewayId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to assign element " + str(gatewayId) + " for Gateway on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# get the Gateway from db
			gateway = GatewayDelegate().get(gatewayId).first();
			
			# assign the Gateway		
			networkProfile.gateway = gateway
			
			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignGateway( self, networkProfileId ):
		errMsg = "Failed to unassign element " + str(gatewayId) + " for Gateway on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# assign to None for unassignment
			networkProfile.gateway = None			

			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except Exception:
			return None;
		
	def assignSimCard( self, networkProfileId, simCardId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

		errMsg = "Failed to assign element " + str(simCardId) + " for SimCard on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# get the SimCard from db
			simCard = SimCardDelegate().get(simCardId).first();
			
			# assign the SimCard		
			networkProfile.simCard = simCard
			
			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSimCard( self, networkProfileId ):
		errMsg = "Failed to unassign element " + str(simCardId) + " for SimCard on NetworkProfile"

		try:
			# get the NetworkProfile from db
			networkProfile = self.get( networkProfileId ).first()	
			
			# assign to None for unassignment
			networkProfile.simCard = None			

			#save it
			networkProfile.save()

			# reload and return the appropriate version					
			return self.get( networkProfileId );
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile with id " + str(networkProfileId) + " does not exist.")
		except Exception:
			return None;
		
