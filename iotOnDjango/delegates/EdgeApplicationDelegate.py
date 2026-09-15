
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.EdgeApplication import EdgeApplication
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model EdgeApplication
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class EdgeApplicationDelegate Declaration
#======================================================================
class EdgeApplicationDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, edgeApplicationId ):
		try:	
			edgeApplication = EdgeApplication.objects.filter(id=edgeApplicationId)
			return edgeApplication.first();
		except EdgeApplication.DoesNotExist:
			raise ProcessingError("EdgeApplication with id " + str(edgeApplicationId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, edgeApplication):
		for model in serializers.deserialize("json", edgeApplication):
			model.save()
			return model;

	def create(self, edgeApplication):
		edgeApplication.save()
		return edgeApplication;

	def saveFromJson(self, edgeApplication):
		for model in serializers.deserialize("json", edgeApplication):
			model.save()
			return edgeApplication;
	
	def save(self, edgeApplication):
		edgeApplication.save()
		return edgeApplication;
	
	def delete(self, edgeApplicationId ):
		errMsg = "Failed to delete EdgeApplication from db using id " + str(edgeApplicationId)
		
		try:
			edgeApplication = EdgeApplication.objects.get(id=edgeApplicationId)
			edgeApplication.delete()
			return True
		except EdgeApplication.DoesNotExist:
			raise ProcessingError("EdgeApplication with id " + str(edgeApplicationId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = EdgeApplication.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all EdgeApplication from db")
		except Exception:
			return None;
		
	def assignGateway( self, edgeApplicationId, gatewayId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to assign element " + str(gatewayId) + " for Gateway on EdgeApplication"

		try:
			# get the EdgeApplication from db
			edgeApplication = self.get( edgeApplicationId ).first()	
			
			# get the Gateway from db
			gateway = GatewayDelegate().get(gatewayId).first();
			
			# assign the Gateway		
			edgeApplication.gateway = gateway
			
			#save it
			edgeApplication.save()

			# reload and return the appropriate version					
			return self.get( edgeApplicationId );
		except EdgeApplication.DoesNotExist:
			raise ProcessingError(errMsg + " : EdgeApplication with id " + str(edgeApplicationId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway with id " + str(gatewayId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignGateway( self, edgeApplicationId ):
		errMsg = "Failed to unassign element " + str(gatewayId) + " for Gateway on EdgeApplication"

		try:
			# get the EdgeApplication from db
			edgeApplication = self.get( edgeApplicationId ).first()	
			
			# assign to None for unassignment
			edgeApplication.gateway = None			

			#save it
			edgeApplication.save()

			# reload and return the appropriate version					
			return self.get( edgeApplicationId );
		except EdgeApplication.DoesNotExist:
			raise ProcessingError(errMsg + " : EdgeApplication with id " + str(edgeApplicationId) + " does not exist.")
		except Exception:
			return None;
		
