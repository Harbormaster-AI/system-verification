
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.TwinChangeEvent import TwinChangeEvent
from iotOnDjango.models.DigitalTwin import DigitalTwin
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model TwinChangeEvent
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinChangeEventDelegate Declaration
#======================================================================
class TwinChangeEventDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, twinChangeEventId ):
		try:	
			twinChangeEvent = TwinChangeEvent.objects.filter(id=twinChangeEventId)
			return twinChangeEvent.first();
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError("TwinChangeEvent with id " + str(twinChangeEventId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, twinChangeEvent):
		for model in serializers.deserialize("json", twinChangeEvent):
			model.save()
			return model;

	def create(self, twinChangeEvent):
		twinChangeEvent.save()
		return twinChangeEvent;

	def saveFromJson(self, twinChangeEvent):
		for model in serializers.deserialize("json", twinChangeEvent):
			model.save()
			return twinChangeEvent;
	
	def save(self, twinChangeEvent):
		twinChangeEvent.save()
		return twinChangeEvent;
	
	def delete(self, twinChangeEventId ):
		errMsg = "Failed to delete TwinChangeEvent from db using id " + str(twinChangeEventId)
		
		try:
			twinChangeEvent = TwinChangeEvent.objects.get(id=twinChangeEventId)
			twinChangeEvent.delete()
			return True
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError("TwinChangeEvent with id " + str(twinChangeEventId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = TwinChangeEvent.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all TwinChangeEvent from db")
		except Exception:
			return None;
		
	def assignTwin( self, twinChangeEventId, twinId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DigitalTwinDelegate import DigitalTwinDelegate

		errMsg = "Failed to assign element " + str(twinId) + " for Twin on TwinChangeEvent"

		try:
			# get the TwinChangeEvent from db
			twinChangeEvent = self.get( twinChangeEventId ).first()	
			
			# get the DigitalTwin from db
			digitalTwin = DigitalTwinDelegate().get(twinId).first();
			
			# assign the Twin		
			twinChangeEvent.twin = digitalTwin
			
			#save it
			twinChangeEvent.save()

			# reload and return the appropriate version					
			return self.get( twinChangeEventId );
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinChangeEvent with id " + str(twinChangeEventId) + " does not exist.")
		except DigitalTwin.DoesNotExist:
			raise ProcessingError(errMsg + " : DigitalTwin with id " + str(twinId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTwin( self, twinChangeEventId ):
		errMsg = "Failed to unassign element " + str(twinId) + " for Twin on TwinChangeEvent"

		try:
			# get the TwinChangeEvent from db
			twinChangeEvent = self.get( twinChangeEventId ).first()	
			
			# assign to None for unassignment
			twinChangeEvent.digitalTwin = None			

			#save it
			twinChangeEvent.save()

			# reload and return the appropriate version					
			return self.get( twinChangeEventId );
		except TwinChangeEvent.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinChangeEvent with id " + str(twinChangeEventId) + " does not exist.")
		except Exception:
			return None;
		
