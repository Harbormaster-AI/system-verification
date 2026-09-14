from django.db import models
from demo.models.InstallmentStatus import InstallmentStatus

#======================================================================
# 
# Encapsulates data for model RepaymentSchedule
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RepaymentSchedule Declaration
#======================================================================
class RepaymentSchedule (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	installmentNumber = models.IntegerField(null=True)
	dueDate = models.DateField(null=True)
	principalDue = Money
	interestDue = Money
	totalDue = Money
	loanAccount = models.ForeignKey('LoanAccount', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	payment = models.ForeignKey('LoanPayment', on_delete=models.CASCADE, null=True, blank=True, related_name='+')
	status = models.CharField(max_length=64, null=True, choices=[(tag.name, tag.value) for tag in InstallmentStatus])

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.installmentNumber
		str = str + self.dueDate
		str = str + self.principalDue
		str = str + self.interestDue
		str = str + self.totalDue
		str = str + self.status
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "RepaymentSchedule";
    
	def objectType(self):
		return "RepaymentSchedule";
