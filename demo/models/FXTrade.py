from django.db import models
from demo.models.TradeStatus import TradeStatus

#======================================================================
# 
# Encapsulates data for model FXTrade
#
# @author your_name_here
#
#======================================================================

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
	amountSold = Money
	amountBought = Money
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
		str = str + self.tradeReference
		str = str + self.tradeDate
		str = str + self.settlementDate
		str = str + self.amountSold
		str = str + self.amountBought
		str = str + self.rate
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "FXTrade";
    
	def objectType(self):
		return "FXTrade";
