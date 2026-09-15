
from django.db import models

#======================================================================
# Class Building Declaration
#======================================================================
class Building (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	site = models.ForeignKey('Site', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	floors = models.ManyToManyField('Floor',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Building";
    
	def objectType(self):
		return "Building";
