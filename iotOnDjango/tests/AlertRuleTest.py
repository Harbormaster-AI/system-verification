
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.AlertRule import AlertRule
from iotOnDjango.delegates.AlertRuleDelegate import AlertRuleDelegate

 #======================================================================
# 
# Encapsulates data for model AlertRule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertRuleTest Declaration
#======================================================================
class AlertRuleTest (TestCase) :
	def test_crud(self) :
		alertRule = AlertRule()
		alertRule.name = "default name field value"
		alertRule.expression = "default expression field value"
		alertRule.severity = "default severity field value"
		
		delegate = AlertRuleDelegate()
		responseObj = delegate.create(alertRule)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


