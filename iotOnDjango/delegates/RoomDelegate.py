
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Room import Room
from iotOnDjango.models.Floor import Floor
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Room
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RoomDelegate Declaration
#======================================================================
class RoomDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, roomId ):
		try:	
			room = Room.objects.filter(id=roomId)
			return room.first();
		except Room.DoesNotExist:
			raise ProcessingError("Room with id " + str(roomId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, room):
		for model in serializers.deserialize("json", room):
			model.save()
			return model;

	def create(self, room):
		room.save()
		return room;

	def saveFromJson(self, room):
		for model in serializers.deserialize("json", room):
			model.save()
			return room;
	
	def save(self, room):
		room.save()
		return room;
	
	def delete(self, roomId ):
		errMsg = "Failed to delete Room from db using id " + str(roomId)
		
		try:
			room = Room.objects.get(id=roomId)
			room.delete()
			return True
		except Room.DoesNotExist:
			raise ProcessingError("Room with id " + str(roomId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Room.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Room from db")
		except Exception:
			return None;
		
	def assignFloor( self, roomId, floorId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FloorDelegate import FloorDelegate

		errMsg = "Failed to assign element " + str(floorId) + " for Floor on Room"

		try:
			# get the Room from db
			room = self.get( roomId ).first()	
			
			# get the Floor from db
			floor = FloorDelegate().get(floorId).first();
			
			# assign the Floor		
			room.floor = floor
			
			#save it
			room.save()

			# reload and return the appropriate version					
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor with id " + str(floorId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignFloor( self, roomId ):
		errMsg = "Failed to unassign element " + str(floorId) + " for Floor on Room"

		try:
			# get the Room from db
			room = self.get( roomId ).first()	
			
			# assign to None for unassignment
			room.floor = None			

			#save it
			room.save()

			# reload and return the appropriate version					
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Exception:
			return None;
		
	def addDevices( self, roomId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to add elements " + str(devicesIds) + " for Devices on Room"

		try:
			# get the Room
			room = self.get( roomId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				room.devices.add(ioTDevice)
				
			# save it		
			room.save()
			
			# reload and return the appropriate version
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDevices( self, roomId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to remove elements " + str(devicesIds) + " for Devices on Room"

		try:
			# get the Room
			room = self.get( roomId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				room.devices.remove(ioTDevice)
				
			# save it		
			room.save()
			
			# reload and return the appropriate version
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addGateways( self, roomId, gatewaysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to add elements " + str(gatewaysIds) + " for Gateways on Room"

		try:
			# get the Room
			room = self.get( roomId ).first()
				
			# split on a comma with no spaces
			idList = gatewaysIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Gateway		
				gateway = GatewayDelegate().get(id).first();	
				# add the Gateway
				room.gateways.add(gateway)
				
			# save it		
			room.save()
			
			# reload and return the appropriate version
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeGateways( self, roomId, gatewaysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to remove elements " + str(gatewaysIds) + " for Gateways on Room"

		try:
			# get the Room
			room = self.get( roomId ).first()
				
			# split on a comma with no spaces
			idList = gatewaysIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Gateway		
				gateway = GatewayDelegate().get(id).first();	
				# add the Gateway
				room.gateways.remove(gateway)
				
			# save it		
			room.save()
			
			# reload and return the appropriate version
			return self.get( roomId );
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room with id " + str(roomId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
