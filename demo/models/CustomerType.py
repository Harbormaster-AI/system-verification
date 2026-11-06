# ======================================================================
#
# Encapsulates data for model CustomerType
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class CustomerType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class CustomerType(Enum):  # A subclass of Enum
    individual = "individual"
    business = "business"
    non_profit = "non_profit"
    government = "government"
