
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from iotOnDjango.models.AlertRule import AlertRule
from iotOnDjango.models.Tenant import Tenant
from iotOnDjango.models.TelemetryStream import TelemetryStream
from iotOnDjango.models.Alert import Alert
from iotOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model AlertRule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertRuleDelegate Declaration
#======================================================================
class AlertRuleDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, alertRuleId ):
		try:	
			alertRule = AlertRule.objects.filter(id=alertRuleId)
			return alertRule.first();
		except AlertRule.DoesNotExist:
			raise ProcessingError("AlertRule with id " + str(alertRuleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, alertRule):
		for model in serializers.deserialize("json", alertRule):
			model.save()
			return model;

	def create(self, alertRule):
		alertRule.save()
		return alertRule;

	def saveFromJson(self, alertRule):
		for model in serializers.deserialize("json", alertRule):
			model.save()
			return alertRule;
	
	def save(self, alertRule):
		alertRule.save()
		return alertRule;
	
	def delete(self, alertRuleId ):
		errMsg = "Failed to delete AlertRule from db using id " + str(alertRuleId)
		
		try:
			alertRule = AlertRule.objects.get(id=alertRuleId)
			alertRule.delete()
			return True
		except AlertRule.DoesNotExist:
			raise ProcessingError("AlertRule with id " + str(alertRuleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = AlertRule.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all AlertRule from db")
		except Exception:
			return None;
		
	def assignTenant( self, alertRuleId, tenantId ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TenantDelegate import TenantDelegate

		errMsg = "Failed to assign element " + str(tenantId) + " for Tenant on AlertRule"

		try:
			# get the AlertRule from db
			alertRule = self.get( alertRuleId ).first()	
			
			# get the Tenant from db
			tenant = TenantDelegate().get(tenantId).first();
			
			# assign the Tenant		
			alertRule.tenant = tenant
			
			#save it
			alertRule.save()

			# reload and return the appropriate version					
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except Tenant.DoesNotExist:
			raise ProcessingError(errMsg + " : Tenant with id " + str(tenantId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignTenant( self, alertRuleId ):
		errMsg = "Failed to unassign element " + str(tenantId) + " for Tenant on AlertRule"

		try:
			# get the AlertRule from db
			alertRule = self.get( alertRuleId ).first()	
			
			# assign to None for unassignment
			alertRule.tenant = None			

			#save it
			alertRule.save()

			# reload and return the appropriate version					
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except Exception:
			return None;
		
	def addStreams( self, alertRuleId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to add elements " + str(streamsIds) + " for Streams on AlertRule"

		try:
			# get the AlertRule
			alertRule = self.get( alertRuleId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				alertRule.streams.add(telemetryStream)
				
			# save it		
			alertRule.save()
			
			# reload and return the appropriate version
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeStreams( self, alertRuleId, streamsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

		errMsg = "Failed to remove elements " + str(streamsIds) + " for Streams on AlertRule"

		try:
			# get the AlertRule
			alertRule = self.get( alertRuleId ).first()
				
			# split on a comma with no spaces
			idList = streamsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the TelemetryStream		
				telemetryStream = TelemetryStreamDelegate().get(id).first();	
				# add the TelemetryStream
				alertRule.streams.remove(telemetryStream)
				
			# save it		
			alertRule.save()
			
			# reload and return the appropriate version
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except TelemetryStream.DoesNotExist:
			raise ProcessingError(errMsg + " : TelemetryStream does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addAlerts( self, alertRuleId, alertsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertDelegate import AlertDelegate

		errMsg = "Failed to add elements " + str(alertsIds) + " for Alerts on AlertRule"

		try:
			# get the AlertRule
			alertRule = self.get( alertRuleId ).first()
				
			# split on a comma with no spaces
			idList = alertsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Alert		
				alert = AlertDelegate().get(id).first();	
				# add the Alert
				alertRule.alerts.add(alert)
				
			# save it		
			alertRule.save()
			
			# reload and return the appropriate version
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAlerts( self, alertRuleId, alertsIds ):
		# lazy importing avoids circular dependencies
		from iotOnDjango.delegates.AlertDelegate import AlertDelegate

		errMsg = "Failed to remove elements " + str(alertsIds) + " for Alerts on AlertRule"

		try:
			# get the AlertRule
			alertRule = self.get( alertRuleId ).first()
				
			# split on a comma with no spaces
			idList = alertsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Alert		
				alert = AlertDelegate().get(id).first();	
				# add the Alert
				alertRule.alerts.remove(alert)
				
			# save it		
			alertRule.save()
			
			# reload and return the appropriate version
			return self.get( alertRuleId );
		except AlertRule.DoesNotExist:
			raise ProcessingError(errMsg + " : AlertRule with id " + str(alertRuleId) + " does not exist.")
		except Alert.DoesNotExist:
			raise ProcessingError(errMsg + " : Alert does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
