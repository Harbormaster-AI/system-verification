
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.Site import Site
from iotOnDjango.models.TenantUser import TenantUser
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.DataRetentionPolicy import DataRetentionPolicy
from iotOnDjango.models.ConnectivityPlan import ConnectivityPlan
from iotOnDjango.models.SimCard import SimCard
from iotOnDjango.models.MessagingEndpoint import MessagingEndpoint
from iotOnDjango.models.AccessPolicy import AccessPolicy
from iotOnDjango.models.DeviceGroup import DeviceGroup
from iotOnDjango.models.AlertRule import AlertRule
from iotOnDjango.models.MaintenanceTicket import MaintenanceTicket
from iotOnDjango.models.UsageRecord import UsageRecord
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Tenant
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantDelegate Declaration
#======================================================================
class TenantDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, tenantId ):
		try:	
			tenant = Tenant.objects.filter(id=tenantId)
			return tenant.first();
		except Tenant.DoesNotExist:
			raise ProcessingError("Tenant with id " + str(tenantId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, tenant):
		for model in serializers.deserialize("json", tenant):
			model.save()
			return model;

	def create(self, tenant):
		tenant.save()
		return tenant;

	def saveFromJson(self, tenant):
		for model in serializers.deserialize("json", tenant):
			model.save()
			return tenant;
	
	def save(self, tenant):
		tenant.save()
		return tenant;
	
	def delete(self, tenantId ):
		errMsg = "Failed to delete Tenant from db using id " + str(tenantId)
		
		try:
			tenant = Tenant.objects.get(id=tenantId)
			tenant.delete()
			return True
		except Tenant.DoesNotExist:
			raise ProcessingError("Tenant with id " + str(tenantId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Tenant.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Tenant from db")
		except Exception:
			return None;
		
	def addSites( self, tenantId, sitesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SiteDelegate import SiteDelegate

		errMsg = "Failed to add elements " + str(sitesIds) + " for Sites on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = sitesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Site		
				site = SiteDelegate().get(id).first();	
				# add the Site
				tenant.sites.add(site)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeSites( self, tenantId, sitesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SiteDelegate import SiteDelegate

		errMsg = "Failed to remove elements " + str(sitesIds) + " for Sites on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = sitesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Site		
				site = SiteDelegate().get(id).first();	
				# add the Site
				tenant.sites.remove(site)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Site.DoesNotExist:
			raise ProcessingError(errMsg + " : Site does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addUsers( self, tenantId, usersIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

		errMsg = "Failed to add elements " + str(usersIds) + " for Users on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = usersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TenantUser		
				tenantUser = TenantUserDelegate().get(id).first();	
				# add the TenantUser
				tenant.users.add(tenantUser)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeUsers( self, tenantId, usersIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

		errMsg = "Failed to remove elements " + str(usersIds) + " for Users on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = usersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TenantUser		
				tenantUser = TenantUserDelegate().get(id).first();	
				# add the TenantUser
				tenant.users.remove(tenantUser)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except TenantUser.DoesNotExist:
			raise ProcessingError(errMsg + " : TenantUser does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDevices( self, tenantId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to add elements " + str(devicesIds) + " for Devices on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				tenant.devices.add(ioTDevice)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDevices( self, tenantId, devicesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to remove elements " + str(devicesIds) + " for Devices on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = devicesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the IoTDevice		
				ioTDevice = IoTDeviceDelegate().get(id).first();	
				# add the IoTDevice
				tenant.devices.remove(ioTDevice)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDataRetentionPolicies( self, tenantId, dataRetentionPoliciesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DataRetentionPolicyDelegate import DataRetentionPolicyDelegate

		errMsg = "Failed to add elements " + str(dataRetentionPoliciesIds) + " for DataRetentionPolicies on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = dataRetentionPoliciesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DataRetentionPolicy		
				dataRetentionPolicy = DataRetentionPolicyDelegate().get(id).first();	
				# add the DataRetentionPolicy
				tenant.dataRetentionPolicies.add(dataRetentionPolicy)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDataRetentionPolicies( self, tenantId, dataRetentionPoliciesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DataRetentionPolicyDelegate import DataRetentionPolicyDelegate

		errMsg = "Failed to remove elements " + str(dataRetentionPoliciesIds) + " for DataRetentionPolicies on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = dataRetentionPoliciesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DataRetentionPolicy		
				dataRetentionPolicy = DataRetentionPolicyDelegate().get(id).first();	
				# add the DataRetentionPolicy
				tenant.dataRetentionPolicies.remove(dataRetentionPolicy)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except DataRetentionPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : DataRetentionPolicy does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addConnectivityPlans( self, tenantId, connectivityPlansIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

		errMsg = "Failed to add elements " + str(connectivityPlansIds) + " for ConnectivityPlans on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = connectivityPlansIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ConnectivityPlan		
				connectivityPlan = ConnectivityPlanDelegate().get(id).first();	
				# add the ConnectivityPlan
				tenant.connectivityPlans.add(connectivityPlan)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeConnectivityPlans( self, tenantId, connectivityPlansIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

		errMsg = "Failed to remove elements " + str(connectivityPlansIds) + " for ConnectivityPlans on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = connectivityPlansIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ConnectivityPlan		
				connectivityPlan = ConnectivityPlanDelegate().get(id).first();	
				# add the ConnectivityPlan
				tenant.connectivityPlans.remove(connectivityPlan)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except ConnectivityPlan.DoesNotExist:
			raise ProcessingError(errMsg + " : ConnectivityPlan does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addSimCards( self, tenantId, simCardsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

		errMsg = "Failed to add elements " + str(simCardsIds) + " for SimCards on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = simCardsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the SimCard		
				simCard = SimCardDelegate().get(id).first();	
				# add the SimCard
				tenant.simCards.add(simCard)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeSimCards( self, tenantId, simCardsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

		errMsg = "Failed to remove elements " + str(simCardsIds) + " for SimCards on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = simCardsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the SimCard		
				simCard = SimCardDelegate().get(id).first();	
				# add the SimCard
				tenant.simCards.remove(simCard)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except SimCard.DoesNotExist:
			raise ProcessingError(errMsg + " : SimCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addMessagingEndpoints( self, tenantId, messagingEndpointsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.MessagingEndpointDelegate import MessagingEndpointDelegate

		errMsg = "Failed to add elements " + str(messagingEndpointsIds) + " for MessagingEndpoints on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = messagingEndpointsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the MessagingEndpoint		
				messagingEndpoint = MessagingEndpointDelegate().get(id).first();	
				# add the MessagingEndpoint
				tenant.messagingEndpoints.add(messagingEndpoint)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeMessagingEndpoints( self, tenantId, messagingEndpointsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.MessagingEndpointDelegate import MessagingEndpointDelegate

		errMsg = "Failed to remove elements " + str(messagingEndpointsIds) + " for MessagingEndpoints on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = messagingEndpointsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the MessagingEndpoint		
				messagingEndpoint = MessagingEndpointDelegate().get(id).first();	
				# add the MessagingEndpoint
				tenant.messagingEndpoints.remove(messagingEndpoint)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except MessagingEndpoint.DoesNotExist:
			raise ProcessingError(errMsg + " : MessagingEndpoint does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAccessPolicies( self, tenantId, accessPoliciesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AccessPolicyDelegate import AccessPolicyDelegate

		errMsg = "Failed to add elements " + str(accessPoliciesIds) + " for AccessPolicies on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = accessPoliciesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the AccessPolicy		
				accessPolicy = AccessPolicyDelegate().get(id).first();	
				# add the AccessPolicy
				tenant.accessPolicies.add(accessPolicy)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAccessPolicies( self, tenantId, accessPoliciesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AccessPolicyDelegate import AccessPolicyDelegate

		errMsg = "Failed to remove elements " + str(accessPoliciesIds) + " for AccessPolicies on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = accessPoliciesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the AccessPolicy		
				accessPolicy = AccessPolicyDelegate().get(id).first();	
				# add the AccessPolicy
				tenant.accessPolicies.remove(accessPolicy)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except AccessPolicy.DoesNotExist:
			raise ProcessingError(errMsg + " : AccessPolicy does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDeviceGroups( self, tenantId, deviceGroupsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

		errMsg = "Failed to add elements " + str(deviceGroupsIds) + " for DeviceGroups on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = deviceGroupsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the DeviceGroup		
				deviceGroup = DeviceGroupDelegate().get(id).first();	
				# add the DeviceGroup
				tenant.deviceGroups.add(deviceGroup)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDeviceGroups( self, tenantId, deviceGroupsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

		errMsg = "Failed to remove elements " + str(deviceGroupsIds) + " for DeviceGroups on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = deviceGroupsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the DeviceGroup		
				deviceGroup = DeviceGroupDelegate().get(id).first();	
				# add the DeviceGroup
				tenant.deviceGroups.remove(deviceGroup)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except DeviceGroup.DoesNotExist:
			raise ProcessingError(errMsg + " : DeviceGroup does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAlertRules( self, tenantId, alertRulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertRuleDelegate import AlertRuleDelegate

		errMsg = "Failed to add elements " + str(alertRulesIds) + " for AlertRules on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = alertRulesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the AlertRule		
				alertRule = AlertRuleDelegate().get(id).first();	
				# add the AlertRule
				tenant.alertRules.add(alertRule)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAlertRules( self, tenantId, alertRulesIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertRuleDelegate import AlertRuleDelegate

		errMsg = "Failed to remove elements " + str(alertRulesIds) + " for AlertRules on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = alertRulesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the AlertRule		
				alertRule = AlertRuleDelegate().get(id).first();	
				# add the AlertRule
				tenant.alertRules.remove(alertRule)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addMaintenanceTickets( self, tenantId, maintenanceTicketsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.MaintenanceTicketDelegate import MaintenanceTicketDelegate

		errMsg = "Failed to add elements " + str(maintenanceTicketsIds) + " for MaintenanceTickets on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = maintenanceTicketsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the MaintenanceTicket		
				maintenanceTicket = MaintenanceTicketDelegate().get(id).first();	
				# add the MaintenanceTicket
				tenant.maintenanceTickets.add(maintenanceTicket)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeMaintenanceTickets( self, tenantId, maintenanceTicketsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.MaintenanceTicketDelegate import MaintenanceTicketDelegate

		errMsg = "Failed to remove elements " + str(maintenanceTicketsIds) + " for MaintenanceTickets on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = maintenanceTicketsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the MaintenanceTicket		
				maintenanceTicket = MaintenanceTicketDelegate().get(id).first();	
				# add the MaintenanceTicket
				tenant.maintenanceTickets.remove(maintenanceTicket)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addUsageRecords( self, tenantId, usageRecordsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.UsageRecordDelegate import UsageRecordDelegate

		errMsg = "Failed to add elements " + str(usageRecordsIds) + " for UsageRecords on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = usageRecordsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the UsageRecord		
				usageRecord = UsageRecordDelegate().get(id).first();	
				# add the UsageRecord
				tenant.usageRecords.add(usageRecord)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeUsageRecords( self, tenantId, usageRecordsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.UsageRecordDelegate import UsageRecordDelegate

		errMsg = "Failed to remove elements " + str(usageRecordsIds) + " for UsageRecords on Tenant"

		try:
			# get the Tenant
			tenant = self.get( tenantId ).first()
				
			# split on a comma with no spaces
			idList = usageRecordsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the UsageRecord		
				usageRecord = UsageRecordDelegate().get(id).first();	
				# add the UsageRecord
				tenant.usageRecords.remove(usageRecord)
				
			# save it		
			tenant.save()
			
			# reload and return the appropriate version
			return self.get( tenantId );
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except UsageRecord.DoesNotExist:
			raise ProcessingError(errMsg + " : UsageRecord does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
