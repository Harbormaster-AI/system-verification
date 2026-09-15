
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Floor import Floor
from iotOnDjango.delegates.FloorDelegate import FloorDelegate

 #======================================================================
# 
# Encapsulates data for model Floor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FloorTest Declaration
#======================================================================
class FloorTest (TestCase) :
	def test_crud(self) :
		floor = Floor()
		floor.name = "default name field value"
		floor.level = 22
		
		delegate = FloorDelegate()
		responseObj = delegate.create(floor)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


