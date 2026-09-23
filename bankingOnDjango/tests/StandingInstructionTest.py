
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
		standing_instruction = StandingInstruction()
		standing_instruction.instructionId = "default instructionId field value"
		standing_instruction.amount = "default amount field value"
		standing_instruction.nextExecutionDate = datetime.datetime.now()
		standing_instruction.frequency = "default frequency field value"
		standing_instruction.status = "default status field value"
		
		delegate = StandingInstructionDelegate()
		response_obj = delegate.create(standing_instruction)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


