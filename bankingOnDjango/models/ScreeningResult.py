
from django.db import models
from bankingOnDjango.models.ScreeningOutcome import ScreeningOutcome

#======================================================================
# Class ScreeningResult Declaration
#======================================================================
class ScreeningResult (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	screening_date = models.DateField(null=True)
	provider = models.CharField(max_length=200, null=True)
	kyc_profile = models.ForeignKey('KycProfile', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	outcome = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ScreeningOutcome])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.screeningDate
		str = str + self.provider
		str = str + self.outcome
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ScreeningResult";
    
	def objectType(self):
		return "ScreeningResult";
