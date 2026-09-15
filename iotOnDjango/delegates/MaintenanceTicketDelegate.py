
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.MaintenanceTicket import MaintenanceTicket
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model MaintenanceTicket
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MaintenanceTicketDelegate Declaration
#======================================================================
class MaintenanceTicketDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, maintenanceTicketId ):
		try:	
			maintenanceTicket = MaintenanceTicket.objects.filter(id=maintenanceTicketId)
			return maintenanceTicket.first();
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError("MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, maintenanceTicket):
		for model in serializers.deserialize("json", maintenanceTicket):
			model.save()
			return model;

	def create(self, maintenanceTicket):
		maintenanceTicket.save()
		return maintenanceTicket;

	def saveFromJson(self, maintenanceTicket):
		for model in serializers.deserialize("json", maintenanceTicket):
			model.save()
			return maintenanceTicket;
	
	def save(self, maintenanceTicket):
		maintenanceTicket.save()
		return maintenanceTicket;
	
	def delete(self, maintenanceTicketId ):
		errMsg = "Failed to delete MaintenanceTicket from db using id " + str(maintenanceTicketId)
		
		try:
			maintenanceTicket = MaintenanceTicket.objects.get(id=maintenanceTicketId)
			maintenanceTicket.delete()
			return True
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError("MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = MaintenanceTicket.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all MaintenanceTicket from db")
		except Exception:
			return None;
		
	def assignDevice( self, maintenanceTicketId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on MaintenanceTicket"

		try:
			# get the MaintenanceTicket from db
			maintenanceTicket = self.get( maintenanceTicketId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			maintenanceTicket.device = ioTDevice
			
			#save it
			maintenanceTicket.save()

			# reload and return the appropriate version					
			return self.get( maintenanceTicketId );
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, maintenanceTicketId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on MaintenanceTicket"

		try:
			# get the MaintenanceTicket from db
			maintenanceTicket = self.get( maintenanceTicketId ).first()	
			
			# assign to None for unassignment
			maintenanceTicket.ioTDevice = None			

			#save it
			maintenanceTicket.save()

			# reload and return the appropriate version					
			return self.get( maintenanceTicketId );
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except Exception:
			return None;
		
	def assignTenant( self, maintenanceTicketId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on MaintenanceTicket"

		try:
			# get the MaintenanceTicket from db
			maintenanceTicket = self.get( maintenanceTicketId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			maintenanceTicket.tenant = tenant
			
			#save it
			maintenanceTicket.save()

			# reload and return the appropriate version					
			return self.get( maintenanceTicketId );
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, maintenanceTicketId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on MaintenanceTicket"

		try:
			# get the MaintenanceTicket from db
			maintenanceTicket = self.get( maintenanceTicketId ).first()	
			
			# assign to None for unassignment
			maintenanceTicket.tenant = None			

			#save it
			maintenanceTicket.save()

			# reload and return the appropriate version					
			return self.get( maintenanceTicketId );
		except MaintenanceTicket.DoesNotExist:
			raise ProcessingError(errMsg + " : MaintenanceTicket with id " + str(maintenanceTicketId) + " does not exist.")
		except Exception:
			return None;
		
