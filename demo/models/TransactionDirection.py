# ======================================================================
#
# Encapsulates data for model TransactionDirection
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class TransactionDirection Declaration (enumerated type)
# ======================================================================
from enum import Enum


class TransactionDirection(Enum):  # A subclass of Enum
    credit = "credit"
    debit = "debit"
