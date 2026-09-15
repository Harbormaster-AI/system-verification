
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.Room import Room
from iotOnDjango.delegates.RoomDelegate import RoomDelegate

 #======================================================================
# 
# Encapsulates data for model Room
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RoomTest Declaration
#======================================================================
class RoomTest (TestCase) :
	def test_crud(self) :
		room = Room()
		room.name = "default name field value"
		
		delegate = RoomDelegate()
		responseObj = delegate.create(room)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


