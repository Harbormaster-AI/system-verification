
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Alert import Alert
from iotOnDjango.delegates.AlertDelegate import AlertDelegate

 #======================================================================
# 
# Encapsulates data for model Alert
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertTest Declaration
#======================================================================
class AlertTest (TestCase) :
	def test_crud(self) :
		alert = Alert()
		alert.raisedAt = "default raisedAt field value"
		alert.clearedAt = "default clearedAt field value"
		alert.message = "default message field value"
		alert.status = "default status field value"
		
		delegate = AlertDelegate()
		responseObj = delegate.create(alert)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


