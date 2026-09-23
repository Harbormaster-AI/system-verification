
import datetime

from django.test import TestCase
from django.utils import timezone
from bankingOnDjango.models.StandingInstruction import StandingInstruction
from bankingOnDjango.delegates.StandingInstructionDelegate import StandingInstructionDelegate

 #======================================================================
# 
# Encapsulates data for model StandingInstruction
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class StandingInstructionTest Declaration
#======================================================================
class StandingInstructionTest (TestCase) :
	def test_crud(self) :
		standingInstruction = StandingInstruction()
		standingInstruction.instructionId = "default instructionId field value"
		standingInstruction.amount = "default amount field value"
		standingInstruction.nextExecutionDate = datetime.datetime.now()
		standingInstruction.frequency = "default frequency field value"
		standingInstruction.status = "default status field value"
		
		delegate = StandingInstructionDelegate()
		responseObj = delegate.create(standingInstruction)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


