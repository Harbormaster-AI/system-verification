# ======================================================================
#
# Encapsulates data for model CardNetwork
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class CardNetwork Declaration (enumerated type)
# ======================================================================
from enum import Enum


class CardNetwork(Enum):  # A subclass of Enum
    visa = "visa"
    mastercard = "mastercard"
    amex = "amex"
    discover = "discover"
    union_pay = "union_pay"
    other = "other"
