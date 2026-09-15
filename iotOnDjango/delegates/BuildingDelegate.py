
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Building import Building
from iotOnDjango.models.Site import Site
from iotOnDjango.models.Floor import Floor
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Building
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BuildingDelegate Declaration
#======================================================================
class BuildingDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, buildingId ):
		try:	
			building = Building.objects.filter(id=buildingId)
			return building.first();
		except Building.DoesNotExist:
			raise ProcessingError("Building with id " + str(buildingId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, building):
		for model in serializers.deserialize("json", building):
			model.save()
			return model;

	def create(self, building):
		building.save()
		return building;

	def saveFromJson(self, building):
		for model in serializers.deserialize("json", building):
			model.save()
			return building;
	
	def save(self, building):
		building.save()
		return building;
	
	def delete(self, buildingId ):
		errMsg = "Failed to delete Building from db using id " + str(buildingId)
		
		try:
			building = Building.objects.get(id=buildingId)
			building.delete()
			return True
		except Building.DoesNotExist:
			raise ProcessingError("Building with id " + str(buildingId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Building.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Building from db")
		except Exception:
			return None;
		
	def assignSite( self, buildingId, siteId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SiteDelegate import SiteDelegate

		errMsg = "Failed to assign element " + str(siteId) + " for Site on Building"

		try:
			# get the Building from db
			building = self.get( buildingId ).first()	
			
			# get the Site from db
			site = SiteDelegate().get(siteId).first();
			
			# assign the Site		
			building.site = site
			
			#save it
			building.save()

			# reload and return the appropriate version					
			return self.get( buildingId );
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building with id " + str(buildingId) + " does not exist.")
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignSite( self, buildingId ):
		errMsg = "Failed to unassign element " + str(siteId) + " for Site on Building"

		try:
			# get the Building from db
			building = self.get( buildingId ).first()	
			
			# assign to None for unassignment
			building.site = None			

			#save it
			building.save()

			# reload and return the appropriate version					
			return self.get( buildingId );
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building with id " + str(buildingId) + " does not exist.")
		except Exception:
			return None;
		
	def addFloors( self, buildingId, floorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FloorDelegate import FloorDelegate

		errMsg = "Failed to add elements " + str(floorsIds) + " for Floors on Building"

		try:
			# get the Building
			building = self.get( buildingId ).first()
				
			# split on a comma with no spaces
			idList = floorsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Floor		
				floor = FloorDelegate().get(id).first();	
				# add the Floor
				building.floors.add(floor)
				
			# save it		
			building.save()
			
			# reload and return the appropriate version
			return self.get( buildingId );
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building with id " + str(buildingId) + " does not exist.")
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFloors( self, buildingId, floorsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.FloorDelegate import FloorDelegate

		errMsg = "Failed to remove elements " + str(floorsIds) + " for Floors on Building"

		try:
			# get the Building
			building = self.get( buildingId ).first()
				
			# split on a comma with no spaces
			idList = floorsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Floor		
				floor = FloorDelegate().get(id).first();	
				# add the Floor
				building.floors.remove(floor)
				
			# save it		
			building.save()
			
			# reload and return the appropriate version
			return self.get( buildingId );
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building with id " + str(buildingId) + " does not exist.")
		except Floor.DoesNotExist:
			raise ProcessingError(errMsg + " : Floor does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
