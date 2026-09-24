

from django.test import TestCase

from bankingOnDjango.models.ATM import ATM
from bankingOnDjango.delegates.ATMDelegate import ATMDelegate


 #======================================================================
# 
# Encapsulates data for model ATM
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMTest Declaration
#======================================================================
class ATMTest (TestCase) :
	def test_crud(self) :
		a_t_m = ATM()
		a_t_m.terminalId = "default terminalId field value"
		a_t_m.location = "default location field value"
		a_t_m.status = "default status field value"
		
		delegate = ATMDelegate()
		response_obj = delegate.create(a_t_m)
		
		self.assertEqual(response_obj, delegate.get( response_obj.id ))
	
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 1 )		
		delegate.delete(response_obj.id)
		
		all_obj = delegate.getAll()
		self.assertEqual(all_obj.count(), 0 )		


