
from django.db import models
from bankingOnDjango.models.CardType import CardType
from bankingOnDjango.models.CardStatus import CardStatus
from bankingOnDjango.models.CardNetwork import CardNetwork

#======================================================================
# Class PaymentCard Declaration
#======================================================================
class PaymentCard (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	cardNumberValue = models.CharField(max_length=200, null=True)
	embossedName = models.CharField(max_length=200, null=True)
	expiryMonth = models.IntegerField(null=True)
	expiryYear = models.IntegerField(null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	customer = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	transactions = models.ManyToManyField('Transaction',  blank=True, related_name='+')
	cardType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CardType])
	cardStatus = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CardStatus])
	network = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in CardNetwork])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.value
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "PaymentCard";
    
	def objectType(self):
		return "PaymentCard";
