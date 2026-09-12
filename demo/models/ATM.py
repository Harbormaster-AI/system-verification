from django.db import models
from demo.models.ATMStatus import ATMStatus

#======================================================================
# 
# Encapsulates data for model ATM
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ATM Declaration
#======================================================================
class ATM (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	terminalId = models.CharField(max_length=200, null=True)
	location = Address
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ATMStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.terminalId
		str = str + self.location
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ATM";
    
	def objectType(self):
		return "ATM";
