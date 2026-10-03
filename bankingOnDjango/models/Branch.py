
from django.db import models

#======================================================================
# Class Branch Declaration
#======================================================================
class Branch (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	branch_code = models.CharField(max_length=200, null=True)
	address_street = models.CharField(max_length=200, null=True)
	address_city = models.CharField(max_length=200, null=True)
	address_state = models.CharField(max_length=200, null=True)
	address_postal_code = models.CharField(max_length=200, null=True)
	address_country = models.CharField(max_length=200, null=True)
	phone = models.CharField(max_length=200, null=True)
	opening_hours = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	accounts = models.ManyToManyField('Account',  blank=True, related_name='+')
	loan_accounts = models.ManyToManyField('LoanAccount',  blank=True, related_name='+')
	atms = models.ManyToManyField('ATM',  blank=True, related_name='+')

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
		return "Branch";
    
	def objectType(self):
		return "Branch";
