
from django.db import models
from bankingOnDjango.models.ATMStatus import ATMStatus

#======================================================================
# Class ATM Declaration
#======================================================================
class ATM (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	terminal_id = models.CharField(max_length=200, null=True)
	location_street = models.CharField(max_length=200, null=True)
	location_city = models.CharField(max_length=200, null=True)
	location_state = models.CharField(max_length=200, null=True)
	location_postal_code = models.CharField(max_length=200, null=True)
	location_country = models.CharField(max_length=200, null=True)
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ATMStatus])

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
		return "ATM";
    
	def objectType(self):
		return "ATM";
