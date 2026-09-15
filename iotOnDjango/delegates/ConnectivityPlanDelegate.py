
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.ConnectivityPlan import ConnectivityPlan
from iotOnDjango.models.SimCard import SimCard
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ConnectivityPlan
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConnectivityPlanDelegate Declaration
#======================================================================
class ConnectivityPlanDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, connectivityPlanId ):
		try:	
			connectivityPlan = ConnectivityPlan.objects.filter(id=connectivityPlanId)
			return connectivityPlan.first();
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError("ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, connectivityPlan):
		for model in serializers.deserialize("json", connectivityPlan):
			model.save()
			return model;

	def create(self, connectivityPlan):
		connectivityPlan.save()
		return connectivityPlan;

	def saveFromJson(self, connectivityPlan):
		for model in serializers.deserialize("json", connectivityPlan):
			model.save()
			return connectivityPlan;
	
	def save(self, connectivityPlan):
		connectivityPlan.save()
		return connectivityPlan;
	
	def delete(self, connectivityPlanId ):
		errMsg = "Failed to delete ConnectivityPlan from db using id " + str(connectivityPlanId)
		
		try:
			connectivityPlan = ConnectivityPlan.objects.get(id=connectivityPlanId)
			connectivityPlan.delete()
			return True
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError("ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ConnectivityPlan.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ConnectivityPlan from db")
		except Exception:
			return None;
		
	def assignTenant( self, connectivityPlanId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on ConnectivityPlan"

		try:
			# get the ConnectivityPlan from db
			connectivityPlan = self.get( connectivityPlanId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			connectivityPlan.tenant = tenant
			
			#save it
			connectivityPlan.save()

			# reload and return the appropriate version					
			return self.get( connectivityPlanId );
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, connectivityPlanId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on ConnectivityPlan"

		try:
			# get the ConnectivityPlan from db
			connectivityPlan = self.get( connectivityPlanId ).first()	
			
			# assign to None for unassignment
			connectivityPlan.tenant = None			

			#save it
			connectivityPlan.save()

			# reload and return the appropriate version					
			return self.get( connectivityPlanId );
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except Exception:
			return None;
		
	def addSimCards( self, connectivityPlanId, simCardsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

		errMsg = "Failed to add elements " + str(simCardsIds) + " for SimCards on ConnectivityPlan"

		try:
			# get the ConnectivityPlan
			connectivityPlan = self.get( connectivityPlanId ).first()
				
			# split on a comma with no spaces
			idList = simCardsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the SimCard		
				simCard = SimCardDelegate().get(id).first();	
				# add the SimCard
				connectivityPlan.simCards.add(simCard)
				
			# save it		
			connectivityPlan.save()
			
			# reload and return the appropriate version
			return self.get( connectivityPlanId );
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeSimCards( self, connectivityPlanId, simCardsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

		errMsg = "Failed to remove elements " + str(simCardsIds) + " for SimCards on ConnectivityPlan"

		try:
			# get the ConnectivityPlan
			connectivityPlan = self.get( connectivityPlanId ).first()
				
			# split on a comma with no spaces
			idList = simCardsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the SimCard		
				simCard = SimCardDelegate().get(id).first();	
				# add the SimCard
				connectivityPlan.simCards.remove(simCard)
				
			# save it		
			connectivityPlan.save()
			
			# reload and return the appropriate version
			return self.get( connectivityPlanId );
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
