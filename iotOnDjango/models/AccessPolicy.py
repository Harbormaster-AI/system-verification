
from django.db import models

#======================================================================
# Class AccessPolicy Declaration
#======================================================================
class AccessPolicy (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	name = models.CharField(max_length=200, null=True)
	scope = models.CharField(max_length=200, null=True)
	expiresAt = models.CharField(max_length=64, null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	apiKeys = models.ManyToManyField('ApiKey',  blank=True, related_name='+')
	users = models.ManyToManyField('TenantUser',  blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.name
		str = str + self.scope
		str = str + self.expiresAt
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "AccessPolicy";
    
	def objectType(self):
		return "AccessPolicy";
