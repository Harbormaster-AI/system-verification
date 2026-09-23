
from django.db import models
from bankingOnDjango.models.CollateralType import CollateralType

#======================================================================
# Class Collateral Declaration
#======================================================================
class Collateral (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	collateralIdentifier = models.CharField(max_length=200, null=True)
	appraisedValueAmount = models.CharField(max_length=64, null=True)
	appraisedValueCurrency = models.CharField(max_length=200, null=True)
	description = models.CharField(max_length=200, null=True)
	locationStreet = models.CharField(max_length=200, null=True)
	locationCity = models.CharField(max_length=200, null=True)
	locationState = models.CharField(max_length=200, null=True)
	locationPostalCode = models.CharField(max_length=200, null=True)
	locationCountry = models.CharField(max_length=200, null=True)
	loanAccount = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	collateralType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CollateralType])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.street
		str = str + self.city
		str = str + self.state
		str = str + self.postalCode
		str = str + self.country
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Collateral";
    
	def objectType(self):
		return "Collateral";
