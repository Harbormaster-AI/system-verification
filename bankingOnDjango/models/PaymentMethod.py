from django.db import models
 #======================================================================
# 
# Encapsulates data for model PaymentMethod
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PaymentMethod Declaration (enumerated type)
#======================================================================
from enum import Enum 
class PaymentMethod(Enum):   # A subclass of Enum
	internal_transfer = 'internal_transfer'
	a_c_h = 'a_c_h'
	wire = 'wire'
	s_e_p_a = 's_e_p_a'
	s_w_i_f_t = 's_w_i_f_t'
	card = 'card'
	cash = 'cash'
	check = 'check'
	mobile_wallet = 'mobile_wallet'
