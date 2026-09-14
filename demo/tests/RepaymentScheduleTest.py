import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.RepaymentSchedule import RepaymentSchedule
from demo.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

 #======================================================================
# 
# Encapsulates data for model RepaymentSchedule
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RepaymentScheduleTest Declaration
#======================================================================
class RepaymentScheduleTest (TestCase) :
	def test_crud(self) :
		repaymentSchedule = RepaymentSchedule()
		repaymentSchedule.installmentNumber = 22
		repaymentSchedule.dueDate = datetime.datetime.now()
		repaymentSchedule.principalDue = "default principalDue field value"
		repaymentSchedule.interestDue = "default interestDue field value"
		repaymentSchedule.totalDue = "default totalDue field value"
		repaymentSchedule.status = "default status field value"
		
		delegate = RepaymentScheduleDelegate()
		responseObj = delegate.create(repaymentSchedule)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


