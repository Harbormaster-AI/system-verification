
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.Alert import Alert
from iotOnDjango.models.IoTDevice import IoTDevice
from iotOnDjango.models.AlertRule import AlertRule
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Alert
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertDelegate Declaration
#======================================================================
class AlertDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, alertId ):
		try:	
			alert = Alert.objects.filter(id=alertId)
			return alert.first();
		except Alert.DoesNotExist:
			raise ProcessingError("Alert with id " + str(alertId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, alert):
		for model in serializers.deserialize("json", alert):
			model.save()
			return model;

	def create(self, alert):
		alert.save()
		return alert;

	def saveFromJson(self, alert):
		for model in serializers.deserialize("json", alert):
			model.save()
			return alert;
	
	def save(self, alert):
		alert.save()
		return alert;
	
	def delete(self, alertId ):
		errMsg = "Failed to delete Alert from db using id " + str(alertId)
		
		try:
			alert = Alert.objects.get(id=alertId)
			alert.delete()
			return True
		except Alert.DoesNotExist:
			raise ProcessingError("Alert with id " + str(alertId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Alert.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Alert from db")
		except Exception:
			return None;
		
	def assignDevice( self, alertId, deviceId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

		errMsg = "Failed to assign element " + str(deviceId) + " for Device on Alert"

		try:
			# get the Alert from db
			alert = self.get( alertId ).first()	
			
			# get the IoTDevice from db
			ioTDevice = IoTDeviceDelegate().get(deviceId).first();
			
			# assign the Device		
			alert.device = ioTDevice
			
			#save it
			alert.save()

			# reload and return the appropriate version					
			return self.get( alertId );
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert with id " + str(alertId) + " does not exist.")
		except IoTDevice.DoesNotExist:
			raise ProcessingError(errMsg + " : IoTDevice with id " + str(deviceId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignDevice( self, alertId ):
		errMsg = "Failed to unassign element " + str(deviceId) + " for Device on Alert"

		try:
			# get the Alert from db
			alert = self.get( alertId ).first()	
			
			# assign to None for unassignment
			alert.ioTDevice = None			

			#save it
			alert.save()

			# reload and return the appropriate version					
			return self.get( alertId );
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert with id " + str(alertId) + " does not exist.")
		except Exception:
			return None;
		
	def assignAlertRule( self, alertId, alertRuleId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertRuleDelegate import AlertRuleDelegate

		errMsg = "Failed to assign element " + str(alertRuleId) + " for AlertRule on Alert"

		try:
			# get the Alert from db
			alert = self.get( alertId ).first()	
			
			# get the AlertRule from db
			alertRule = AlertRuleDelegate().get(alertRuleId).first();
			
			# assign the AlertRule		
			alert.alertRule = alertRule
			
			#save it
			alert.save()

			# reload and return the appropriate version					
			return self.get( alertId );
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert with id " + str(alertId) + " does not exist.")
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAlertRule( self, alertId ):
		errMsg = "Failed to unassign element " + str(alertRuleId) + " for AlertRule on Alert"

		try:
			# get the Alert from db
			alert = self.get( alertId ).first()	
			
			# assign to None for unassignment
			alert.alertRule = None			

			#save it
			alert.save()

			# reload and return the appropriate version					
			return self.get( alertId );
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert with id " + str(alertId) + " does not exist.")
		except Exception:
			return None;
		
