
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.SimCard import SimCard
from iotOnDjango.models.NetworkProfile import NetworkProfile
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.ConnectivityPlan import ConnectivityPlan
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model SimCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SimCardDelegate Declaration
#======================================================================
class SimCardDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, simCardId ):
		try:	
			simCard = SimCard.objects.filter(id=simCardId)
			return simCard.first();
		except SimCard.DoesNotExist:
			raise ProcessingError("SimCard with id " + str(simCardId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, simCard):
		for model in serializers.deserialize("json", simCard):
			model.save()
			return model;

	def create(self, simCard):
		simCard.save()
		return simCard;

	def saveFromJson(self, simCard):
		for model in serializers.deserialize("json", simCard):
			model.save()
			return simCard;
	
	def save(self, simCard):
		simCard.save()
		return simCard;
	
	def delete(self, simCardId ):
		errMsg = "Failed to delete SimCard from db using id " + str(simCardId)
		
		try:
			simCard = SimCard.objects.get(id=simCardId)
			simCard.delete()
			return True
		except SimCard.DoesNotExist:
			raise ProcessingError("SimCard with id " + str(simCardId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = SimCard.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all SimCard from db")
		except Exception:
			return None;
		
	def assignTenant( self, simCardId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on SimCard"

		try:
			# get the SimCard from db
			simCard = self.get( simCardId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			simCard.tenant = tenant
			
			#save it
			simCard.save()

			# reload and return the appropriate version					
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, simCardId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on SimCard"

		try:
			# get the SimCard from db
			simCard = self.get( simCardId ).first()	
			
			# assign to None for unassignment
			simCard.tenant = None			

			#save it
			simCard.save()

			# reload and return the appropriate version					
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except Exception:
			return None;
		
	def assignConnectivityPlan( self, simCardId, connectivityPlanId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

		errMsg = "Failed to assign element " + str(connectivityPlanId) + " for ConnectivityPlan on SimCard"

		try:
			# get the SimCard from db
			simCard = self.get( simCardId ).first()	
			
			# get the ConnectivityPlan from db
			connectivityPlan = ConnectivityPlanDelegate().get(connectivityPlanId).first();
			
			# assign the ConnectivityPlan		
			simCard.connectivityPlan = connectivityPlan
			
			#save it
			simCard.save()

			# reload and return the appropriate version					
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan with id " + str(connectivityPlanId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignConnectivityPlan( self, simCardId ):
		errMsg = "Failed to unassign element " + str(connectivityPlanId) + " for ConnectivityPlan on SimCard"

		try:
			# get the SimCard from db
			simCard = self.get( simCardId ).first()	
			
			# assign to None for unassignment
			simCard.connectivityPlan = None			

			#save it
			simCard.save()

			# reload and return the appropriate version					
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except Exception:
			return None;
		
	def addNetworkProfiles( self, simCardId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to add elements " + str(networkProfilesIds) + " for NetworkProfiles on SimCard"

		try:
			# get the SimCard
			simCard = self.get( simCardId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				simCard.networkProfiles.add(networkProfile)
				
			# save it		
			simCard.save()
			
			# reload and return the appropriate version
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeNetworkProfiles( self, simCardId, networkProfilesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

		errMsg = "Failed to remove elements " + str(networkProfilesIds) + " for NetworkProfiles on SimCard"

		try:
			# get the SimCard
			simCard = self.get( simCardId ).first()
				
			# split on a comma with no spaces
			idList = networkProfilesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the NetworkProfile		
				networkProfile = NetworkProfileDelegate().get(id).first();	
				# add the NetworkProfile
				simCard.networkProfiles.remove(networkProfile)
				
			# save it		
			simCard.save()
			
			# reload and return the appropriate version
			return self.get( simCardId );
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard with id " + str(simCardId) + " does not exist.")
		except NetworkProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : NetworkProfile does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
