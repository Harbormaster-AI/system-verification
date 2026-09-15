
import datetime

from django.test import TestCase
from django.utils import timezone
from iotOnDjango.models.SimCard import SimCard
from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

 #======================================================================
# 
# Encapsulates data for model SimCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SimCardTest Declaration
#======================================================================
class SimCardTest (TestCase) :
	def test_crud(self) :
		simCard = SimCard()
		simCard.iccid = "default iccid field value"
		simCard.imsi = "default imsi field value"
		simCard.carrier = "default carrier field value"
		simCard.status = "default status field value"
		
		delegate = SimCardDelegate()
		responseObj = delegate.create(simCard)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


