from django.db import models
from demo.models.LoanType import LoanType
from demo.models.RateType import RateType
from demo.models.InterestCompounding import InterestCompounding
from demo.models.LoanStatus import LoanStatus

#======================================================================
# 
# Encapsulates data for model LoanAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanAccount Declaration
#======================================================================
class LoanAccount (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	loanNumber = models.CharField(max_length=200, null=True)
	principalAmount = Money
	outstandingPrincipal = Money
	interestRate = Percentage
	originationDate = models.DateField(null=True)
	maturityDate = models.DateField(null=True)
	paymentDayOfMonth = models.IntegerField(null=True)
	currency = models.CharField(max_length=200, null=True)
	bank = models.ForeignKey('Bank', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	branch = models.ForeignKey('Branch', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	product = models.ForeignKey('BankingProduct', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	borrowers = models.ManyToManyField('Customer',  blank=True, related_name='+')
	repaymentSchedule = models.ManyToManyField('RepaymentSchedule',  blank=True, related_name='+')
	payments = models.ManyToManyField('LoanPayment',  blank=True, related_name='+')
	collateral = models.ManyToManyField('Collateral',  blank=True, related_name='+')
	feeCharges = models.ManyToManyField('FeeCharge',  blank=True, related_name='+')
	loanType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in LoanType])
	rateType = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in RateType])
	compounding = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in InterestCompounding])
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in LoanStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.loanNumber
		str = str + self.principalAmount
		str = str + self.outstandingPrincipal
		str = str + self.interestRate
		str = str + self.originationDate
		str = str + self.maturityDate
		str = str + self.paymentDayOfMonth
		str = str + self.currency
		str = str + self.loanType
		str = str + self.rateType
		str = str + self.compounding
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "LoanAccount";
    
	def objectType(self):
		return "LoanAccount";
