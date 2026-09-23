
from django.db import models
from bankingOnDjango.models.TradeStatus import TradeStatus

#======================================================================
# Class FXTrade Declaration
#======================================================================
class FXTrade (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	tradeReference = models.CharField(max_length=200, null=True)
	tradeDate = models.DateField(null=True)
	settlementDate = models.DateField(null=True)
	amountSoldAmount = models.CharField(max_length=64, null=True)
	amountSoldCurrency = models.CharField(max_length=200, null=True)
	amountBoughtAmount = models.CharField(max_length=64, null=True)
	amountBoughtCurrency = models.CharField(max_length=200, null=True)
	rate = models.CharField(max_length=64, null=True)
	customer = models.ForeignKey('Customer', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	exchangeRate = models.ForeignKey('ExchangeRate', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	sourceAccount = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	destinationAccount = models.ForeignKey('Account', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	transaction = models.OneToOneField('Transaction', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in TradeStatus])

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
		return "FXTrade";
    
	def objectType(self):
		return "FXTrade";
