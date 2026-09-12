import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.RiskAssessment import RiskAssessment
from demo.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

 #======================================================================
# 
# Encapsulates data for model RiskAssessment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RiskAssessmentTest Declaration
#======================================================================
class RiskAssessmentTest (TestCase) :
	def test_crud(self) :
		riskAssessment = RiskAssessment()
		riskAssessment.score = 22
		riskAssessment.assessedOn = datetime.datetime.now()
		riskAssessment.rating = "default rating field value"
		
		delegate = RiskAssessmentDelegate()
		responseObj = delegate.create(riskAssessment)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


