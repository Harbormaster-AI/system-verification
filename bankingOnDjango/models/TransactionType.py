# ======================================================================
#
# Encapsulates data for model TransactionType
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class TransactionType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class TransactionType(Enum):  # A subclass of Enum
    deposit = "deposit"
    withdrawal = "withdrawal"
    transfer = "transfer"
    payment = "payment"
    fee = "fee"
    interest = "interest"
    adjustment = "adjustment"
    chargeback = "chargeback"
    refund = "refund"
    f_x_conversion = "f_x_conversion"
