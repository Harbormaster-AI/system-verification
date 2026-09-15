
from django.db import models

#======================================================================
# Class ApiKey Declaration
#======================================================================
class ApiKey (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	keyId = models.CharField(max_length=200, null=True)
	hashedSecret = models.CharField(max_length=200, null=True)
	createdAt = models.CharField(max_length=64, null=True)
	lastUsedAt = models.CharField(max_length=64, null=True)
	accessPolicy = models.ForeignKey('AccessPolicy', on_delete=models.CASCADE, null=True, blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.keyId
		str = str + self.hashedSecret
		str = str + self.createdAt
		str = str + self.lastUsedAt
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "ApiKey";
    
	def objectType(self):
		return "ApiKey";
