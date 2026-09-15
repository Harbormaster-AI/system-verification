
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Site import Site
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.Building import Building
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Gateway import Gateway
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Site
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SiteDelegate Declaration
#======================================================================
class SiteDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, siteId ):
		try:	
			site = Site.objects.filter(id=siteId)
			return site.first();
		except Site.DoesNotExist:
			raise ProcessingError("Site with id " + str(siteId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, site):
		for model in serializers.deserialize("json", site):
			model.save()
			return model;

	def create(self, site):
		site.save()
		return site;

	def saveFromJson(self, site):
		for model in serializers.deserialize("json", site):
			model.save()
			return site;
	
	def save(self, site):
		site.save()
		return site;
	
	def delete(self, siteId ):
		errMsg = "Failed to delete Site from db using id " + str(siteId)
		
		try:
			site = Site.objects.get(id=siteId)
			site.delete()
			return True
		except Site.DoesNotExist:
			raise ProcessingError("Site with id " + str(siteId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Site.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Site from db")
		except Exception:
			return None;
		
	def assignTenant( self, siteId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on Site"

		try:
			# get the Site from db
			site = self.get( siteId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			site.tenant = tenant
			
			#save it
			site.save()

			# reload and return the appropriate version					
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, siteId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on Site"

		try:
			# get the Site from db
			site = self.get( siteId ).first()	
			
			# assign to None for unassignment
			site.tenant = None			

			#save it
			site.save()

			# reload and return the appropriate version					
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Exception:
			return None;
		
	def addBuildings( self, siteId, buildingsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.BuildingDelegate import BuildingDelegate

		errMsg = "Failed to add elements " + str(buildingsIds) + " for Buildings on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = buildingsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Building		
				building = BuildingDelegate().get(id).first();	
				# add the Building
				site.buildings.add(building)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeBuildings( self, siteId, buildingsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.BuildingDelegate import BuildingDelegate

		errMsg = "Failed to remove elements " + str(buildingsIds) + " for Buildings on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = buildingsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Building		
				building = BuildingDelegate().get(id).first();	
				# add the Building
				site.buildings.remove(building)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Building.DoesNotExist:
			raise ProcessingError(errMsg + " : Building does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDevices( self, siteId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to add elements " + str(devicesIds) + " for Devices on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				site.devices.add(ioTDevice)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDevices( self, siteId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to remove elements " + str(devicesIds) + " for Devices on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				site.devices.remove(ioTDevice)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addGateways( self, siteId, gatewaysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to add elements " + str(gatewaysIds) + " for Gateways on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = gatewaysIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Gateway		
				gateway = GatewayDelegate().get(id).first();	
				# add the Gateway
				site.gateways.add(gateway)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeGateways( self, siteId, gatewaysIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

		errMsg = "Failed to remove elements " + str(gatewaysIds) + " for Gateways on Site"

		try:
			# get the Site
			site = self.get( siteId ).first()
				
			# split on a comma with no spaces
			idList = gatewaysIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Gateway		
				gateway = GatewayDelegate().get(id).first();	
				# add the Gateway
				site.gateways.remove(gateway)
				
			# save it		
			site.save()
			
			# reload and return the appropriate version
			return self.get( siteId );
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site with id " + str(siteId) + " does not exist.")
		except Gateway.DoesNotExist:
			raise ProcessingError(errMsg + " : Gateway does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
