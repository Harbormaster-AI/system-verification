
from django.db import models
from iotOnDjango.models.UserRole import UserRole

#======================================================================
# Class TenantUser Declaration
#======================================================================
class TenantUser (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	firstName = models.CharField(max_length=200, null=True)
	lastName = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200, null=True)
	tenant = models.ForeignKey('Tenant', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	commandInvocations = models.ManyToManyField('CommandInvocation',  blank=True, related_name='+')
	role = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in UserRole])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.firstName
		str = str + self.lastName
		str = str + self.email
		str = str + self.role
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "TenantUser";
    
	def objectType(self):
		return "TenantUser";
