
from django.db import models
from bankingOnDjango.models.CollateralType import CollateralType

#======================================================================
# Class Collateral Declaration
#======================================================================
class Collateral (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	collateral_identifier = models.CharField(max_length=200, null=True)
	appraised_value_amount = models.CharField(max_length=64, null=True)
	appraised_value_currency = models.CharField(max_length=200, null=True)
	description = models.CharField(max_length=200, null=True)
	location_street = models.CharField(max_length=200, null=True)
	location_city = models.CharField(max_length=200, null=True)
	location_state = models.CharField(max_length=200, null=True)
	location_postal_code = models.CharField(max_length=200, null=True)
	location_country = models.CharField(max_length=200, null=True)
	loan_account = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	collateral_type = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CollateralType])

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
