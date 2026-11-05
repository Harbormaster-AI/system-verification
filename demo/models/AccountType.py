# ======================================================================
#
# Encapsulates data for model AccountType
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class AccountType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class AccountType(Enum):  # A subclass of Enum
    checking = "checking"
    savings = "savings"
    money_market = "money_market"
    time_deposit = "time_deposit"
