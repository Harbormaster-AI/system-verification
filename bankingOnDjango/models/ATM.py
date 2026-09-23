
from django.db import models
from bankingOnDjango.models.ATMStatus import ATMStatus

#======================================================================
# Class ATM Declaration
#======================================================================
class ATM (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	terminalId = models.CharField(max_length=200, null=True)
	locationStreet = models.CharField(max_length=200, null=True)
	locationCity = models.CharField(max_length=200, null=True)
	locationState = models.CharField(max_length=200, null=True)
	locationPostalCode = models.CharField(max_length=200, null=True)
	locationCountry = models.CharField(max_length=200, null=True)
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
