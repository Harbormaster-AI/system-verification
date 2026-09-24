

from django.test import TestCase

from bankingOnDjango.models.RepaymentSchedule import RepaymentSchedule
from bankingOnDjango.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

import datetime

 #======================================================================
# 
# Encapsulates data for model RepaymentSchedule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RepaymentScheduleTest Declaration
#======================================================================
class RepaymentScheduleTest (TestCase) :
	def test_crud(self) :
		repayment_schedule = RepaymentSchedule()
		repayment_schedule.installmentNumber = 22
		repayment_schedule.dueDate = datetime.datetime.now()
		repayment_schedule.principalDue = "default principalDue field value"
		repayment_schedule.interestDue = "default interestDue field value"
		repayment_schedule.totalDue = "default totalDue field value"
		repayment_schedule.status = "default status field value"
		
		delegate = RepaymentScheduleDelegate()
		response_obj = delegate.create(repayment_schedule)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


