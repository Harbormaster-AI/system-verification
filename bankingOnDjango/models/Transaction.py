
from django.db import models
from bankingOnDjango.models.TransactionDirection import TransactionDirection
from bankingOnDjango.models.TransactionType import TransactionType
from bankingOnDjango.models.TransactionStatus import TransactionStatus
from bankingOnDjango.models.ChannelType import ChannelType

#======================================================================
# Class Transaction Declaration
#======================================================================
class Transaction (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	bookingDate = models.DateField(null=True)
	valueDate = models.DateField(null=True)
	amountAmount = models.CharField(max_length=64, null=True)
	amountCurrency = models.CharField(max_length=200, null=True)
	description = models.CharField(max_length=200, null=True)
	account = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	externalCounterparty = models.ForeignKey('ExternalAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	paymentCard = models.ForeignKey('PaymentCard', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	fundsTransfer = models.ForeignKey('FundsTransfer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	fxTrade = models.ForeignKey('FXTrade', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	dispute = models.OneToOneField('Dispute', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	direction = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TransactionDirection])
	transactionType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TransactionType])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TransactionStatus])
	channel = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in ChannelType])

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
		return "Transaction";
    
	def objectType(self):
		return "Transaction";
