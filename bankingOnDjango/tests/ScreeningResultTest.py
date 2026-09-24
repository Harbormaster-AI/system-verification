

from django.test import TestCase

from bankingOnDjango.models.ScreeningResult import ScreeningResult
from bankingOnDjango.delegates.ScreeningResultDelegate import ScreeningResultDelegate


 #======================================================================
# 
# Encapsulates data for model ScreeningResult
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ScreeningResultTest Declaration
#======================================================================
class ScreeningResultTest (TestCase) :
	def test_crud(self) :
		screening_result = ScreeningResult()
		screening_result.screeningDate = datetime.datetime.now()
		screening_result.provider = "default provider field value"
		screening_result.outcome = "default outcome field value"
		
		delegate = ScreeningResultDelegate()
		response_obj = delegate.create(screening_result)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


