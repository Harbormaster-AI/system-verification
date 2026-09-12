from django.db import models
from demo.models.StandingInstructionFrequency import StandingInstructionFrequency
from demo.models.StandingInstructionStatus import StandingInstructionStatus

#======================================================================
# 
# Encapsulates data for model StandingInstruction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class StandingInstruction Declaration
#======================================================================
class StandingInstruction (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	instructionId = models.CharField(max_length=200, null=True)
	amount = Money
	nextExecutionDate = models.DateField(null=True)
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	beneficiary = models.ForeignKey('ExternalAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	frequency = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in StandingInstructionFrequency])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in StandingInstructionStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.instructionId
		str = str + self.amount
		str = str + self.nextExecutionDate
		str = str + self.frequency
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "StandingInstruction";
    
	def objectType(self):
		return "StandingInstruction";
