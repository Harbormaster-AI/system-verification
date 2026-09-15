
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.ConnectivityPlan import ConnectivityPlan
from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

 #======================================================================
# 
# Encapsulates data for model ConnectivityPlan
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConnectivityPlanTest Declaration
#======================================================================
class ConnectivityPlanTest (TestCase) :
	def test_crud(self) :
		connectivityPlan = ConnectivityPlan()
		connectivityPlan.name = "default name field value"
		connectivityPlan.dataCapMB = 22
		connectivityPlan.billingCycleDays = 22
		
		delegate = ConnectivityPlanDelegate()
		responseObj = delegate.create(connectivityPlan)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


