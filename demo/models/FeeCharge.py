from django.db import models
from demo.models.FeeType import FeeType

#======================================================================
# 
# Encapsulates data for model FeeCharge
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FeeCharge Declaration
#======================================================================
class FeeCharge (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	feeCode = models.CharField(max_length=200, null=True)
	amount = Money
	appliedOn = models.DateField(null=True)
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	loanAccount = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	feeType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in FeeType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.feeCode
		str = str + self.amount
		str = str + self.appliedOn
		str = str + self.feeType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "FeeCharge";
    
	def objectType(self):
		return "FeeCharge";
