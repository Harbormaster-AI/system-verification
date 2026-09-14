import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.ScreeningResult import ScreeningResult
from demo.delegates.ScreeningResultDelegate import ScreeningResultDelegate

 #======================================================================
# 
# Encapsulates data for model ScreeningResult
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ScreeningResultTest Declaration
#======================================================================
class ScreeningResultTest (TestCase) :
	def test_crud(self) :
		screeningResult = ScreeningResult()
		screeningResult.screeningDate = datetime.datetime.now()
		screeningResult.provider = "default provider field value"
		screeningResult.outcome = "default outcome field value"
		
		delegate = ScreeningResultDelegate()
		responseObj = delegate.create(screeningResult)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


