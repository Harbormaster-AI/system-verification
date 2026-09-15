
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.TwinTemplate import TwinTemplate
from iotOnDjango.models.DeviceModel import DeviceModel
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model TwinTemplate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinTemplateDelegate Declaration
#======================================================================
class TwinTemplateDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, twinTemplateId ):
		try:	
			twinTemplate = TwinTemplate.objects.filter(id=twinTemplateId)
			return twinTemplate.first();
		except TwinTemplate.DoesNotExist:
			raise ProcessingError("TwinTemplate with id " + str(twinTemplateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, twinTemplate):
		for model in serializers.deserialize("json", twinTemplate):
			model.save()
			return model;

	def create(self, twinTemplate):
		twinTemplate.save()
		return twinTemplate;

	def saveFromJson(self, twinTemplate):
		for model in serializers.deserialize("json", twinTemplate):
			model.save()
			return twinTemplate;
	
	def save(self, twinTemplate):
		twinTemplate.save()
		return twinTemplate;
	
	def delete(self, twinTemplateId ):
		errMsg = "Failed to delete TwinTemplate from db using id " + str(twinTemplateId)
		
		try:
			twinTemplate = TwinTemplate.objects.get(id=twinTemplateId)
			twinTemplate.delete()
			return True
		except TwinTemplate.DoesNotExist:
			raise ProcessingError("TwinTemplate with id " + str(twinTemplateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = TwinTemplate.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all TwinTemplate from db")
		except Exception:
			return None;
		
	def addDeviceModels( self, twinTemplateId, deviceModelsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to add elements " + str(deviceModelsIds) + " for DeviceModels on TwinTemplate"

		try:
			# get the TwinTemplate
			twinTemplate = self.get( twinTemplateId ).first()
				
			# split on a comma with no spaces
			idList = deviceModelsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceModel		
				deviceModel = DeviceModelDelegate().get(id).first();	
				# add the DeviceModel
				twinTemplate.deviceModels.add(deviceModel)
				
			# save it		
			twinTemplate.save()
			
			# reload and return the appropriate version
			return self.get( twinTemplateId );
		except TwinTemplate.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinTemplate with id " + str(twinTemplateId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDeviceModels( self, twinTemplateId, deviceModelsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

		errMsg = "Failed to remove elements " + str(deviceModelsIds) + " for DeviceModels on TwinTemplate"

		try:
			# get the TwinTemplate
			twinTemplate = self.get( twinTemplateId ).first()
				
			# split on a comma with no spaces
			idList = deviceModelsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceModel		
				deviceModel = DeviceModelDelegate().get(id).first();	
				# add the DeviceModel
				twinTemplate.deviceModels.remove(deviceModel)
				
			# save it		
			twinTemplate.save()
			
			# reload and return the appropriate version
			return self.get( twinTemplateId );
		except TwinTemplate.DoesNotExist:
			raise ProcessingError(errMsg + " : TwinTemplate with id " + str(twinTemplateId) + " does not exist.")
		except DeviceModel.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceModel does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
