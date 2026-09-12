from django.db import models
from demo.models.CollateralType import CollateralType

#======================================================================
# 
# Encapsulates data for model Collateral
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class Collateral Declaration
#======================================================================
class Collateral (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	appraisedValue = Money
	description = models.CharField(max_length=200, null=True)
	location = Address
	loanAccount = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	collateralType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CollateralType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.appraisedValue
		str = str + self.description
		str = str + self.location
		str = str + self.collateralType
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Collateral";
    
	def objectType(self):
		return "Collateral";
