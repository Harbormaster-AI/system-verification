
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Floor import Floor
from iotOnDjango.models.Building import Building
from iotOnDjango.models.Room import Room
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Floor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FloorDelegate Declaration
#======================================================================
class FloorDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, floorId ):
		try:	
			floor = Floor.objects.filter(id=floorId)
			return floor.first();
		except Floor.DoesNotExist:
			raise ProcessingError("Floor with id " + str(floorId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, floor):
		for model in serializers.deserialize("json", floor):
			model.save()
			return model;

	def create(self, floor):
		floor.save()
		return floor;

	def saveFromJson(self, floor):
		for model in serializers.deserialize("json", floor):
			model.save()
			return floor;
	
	def save(self, floor):
		floor.save()
		return floor;
	
	def delete(self, floorId ):
		errMsg = "Failed to delete Floor from db using id " + str(floorId)
		
		try:
			floor = Floor.objects.get(id=floorId)
			floor.delete()
			return True
		except Floor.DoesNotExist:
			raise ProcessingError("Floor with id " + str(floorId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Floor.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Floor from db")
		except Exception:
			return None;
		
	def assignBuilding( self, floorId, buildingId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.BuildingDelegate import BuildingDelegate

		errMsg = "Failed to assign element " + str(buildingId) + " for Building on Floor"

		try:
			# get the Floor from db
			floor = self.get( floorId ).first()	
			
			# get the Building from db
			building = BuildingDelegate().get(buildingId).first();
			
			# assign the Building		
			floor.building = building
			
			#save it
			floor.save()

			# reload and return the appropriate version					
			return self.get( floorId );
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor with id " + str(floorId) + " does not exist.")
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building with id " + str(buildingId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBuilding( self, floorId ):
		errMsg = "Failed to unassign element " + str(buildingId) + " for Building on Floor"

		try:
			# get the Floor from db
			floor = self.get( floorId ).first()	
			
			# assign to None for unassignment
			floor.building = None			

			#save it
			floor.save()

			# reload and return the appropriate version					
			return self.get( floorId );
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor with id " + str(floorId) + " does not exist.")
		except Exception:
			return None;
		
	def addRooms( self, floorId, roomsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.RoomDelegate import RoomDelegate

		errMsg = "Failed to add elements " + str(roomsIds) + " for Rooms on Floor"

		try:
			# get the Floor
			floor = self.get( floorId ).first()
				
			# split on a comma with no spaces
			idList = roomsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Room		
				room = RoomDelegate().get(id).first();	
				# add the Room
				floor.rooms.add(room)
				
			# save it		
			floor.save()
			
			# reload and return the appropriate version
			return self.get( floorId );
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor with id " + str(floorId) + " does not exist.")
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeRooms( self, floorId, roomsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.RoomDelegate import RoomDelegate

		errMsg = "Failed to remove elements " + str(roomsIds) + " for Rooms on Floor"

		try:
			# get the Floor
			floor = self.get( floorId ).first()
				
			# split on a comma with no spaces
			idList = roomsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Room		
				room = RoomDelegate().get(id).first();	
				# add the Room
				floor.rooms.remove(room)
				
			# save it		
			floor.save()
			
			# reload and return the appropriate version
			return self.get( floorId );
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor with id " + str(floorId) + " does not exist.")
		except Room.DoesNotExist:
			raise ProcessingError(errMsg + " : Room does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
