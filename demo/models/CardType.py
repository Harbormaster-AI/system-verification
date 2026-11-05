# ======================================================================
#
# Encapsulates data for model CardType
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class CardType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class CardType(Enum):  # A subclass of Enum
    debit = "debit"
    credit = "credit"
    prepaid = "prepaid"
    virtual = "virtual"
