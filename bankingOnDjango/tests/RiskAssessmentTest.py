

from django.test import TestCase

from bankingOnDjango.models.RiskAssessment import RiskAssessment
from bankingOnDjango.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate


 #======================================================================
# 
# Encapsulates data for model RiskAssessment
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RiskAssessmentTest Declaration
#======================================================================
class RiskAssessmentTest (TestCase) :
	def test_crud(self) :
		risk_assessment = RiskAssessment()
		risk_assessment.score = 22
		risk_assessment.assessedOn = datetime.datetime.now()
		risk_assessment.rating = "default rating field value"
		
		delegate = RiskAssessmentDelegate()
		response_obj = delegate.create(risk_assessment)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


