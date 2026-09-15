
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Building import Building
from iotOnDjango.delegates.BuildingDelegate import BuildingDelegate

 #======================================================================
# 
# Encapsulates data for model Building
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BuildingTest Declaration
#======================================================================
class BuildingTest (TestCase) :
	def test_crud(self) :
		building = Building()
		building.name = "default name field value"
		
		delegate = BuildingDelegate()
		responseObj = delegate.create(building)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


