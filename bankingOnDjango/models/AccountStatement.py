
from django.db import models
from bankingOnDjango.models.StatementDeliveryMethod import StatementDeliveryMethod

#======================================================================
# Class AccountStatement Declaration
#======================================================================
class AccountStatement (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	statement_number = models.CharField(max_length=200, null=True)
	period_start = models.DateField(null=True)
	period_end = models.DateField(null=True)
	opening_balance_amount = models.CharField(max_length=64, null=True)
	opening_balance_currency = models.CharField(max_length=200, null=True)
	closing_balance_amount = models.CharField(max_length=64, null=True)
	closing_balance_currency = models.CharField(max_length=200, null=True)
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	delivery_method = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in StatementDeliveryMethod])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.amount
		str = str + self.currency
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "AccountStatement";
    
	def objectType(self):
		return "AccountStatement";
