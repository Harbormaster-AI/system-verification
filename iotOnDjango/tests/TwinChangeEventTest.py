
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.TwinChangeEvent import TwinChangeEvent
from iotOnDjango.delegates.TwinChangeEventDelegate import TwinChangeEventDelegate

 #======================================================================
# 
# Encapsulates data for model TwinChangeEvent
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinChangeEventTest Declaration
#======================================================================
class TwinChangeEventTest (TestCase) :
	def test_crud(self) :
		twinChangeEvent = TwinChangeEvent()
		twinChangeEvent.eventId = "default eventId field value"
		twinChangeEvent.occurredAt = "default occurredAt field value"
		twinChangeEvent.changeType = "default changeType field value"
		
		delegate = TwinChangeEventDelegate()
		responseObj = delegate.create(twinChangeEvent)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


