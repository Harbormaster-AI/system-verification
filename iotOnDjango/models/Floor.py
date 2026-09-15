
from django.db import models

#======================================================================
# Class Floor Declaration
#======================================================================
class Floor (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	level = models.IntegerField(null=True)
	building = models.ForeignKey('Building', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	rooms = models.ManyToManyField('Room',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.level
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "Floor";
    
	def objectType(self):
		return "Floor";
