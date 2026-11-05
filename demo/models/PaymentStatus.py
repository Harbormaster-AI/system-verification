# ======================================================================
#
# Encapsulates data for model PaymentStatus
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class PaymentStatus Declaration (enumerated type)
# ======================================================================
from enum import Enum


class PaymentStatus(Enum):  # A subclass of Enum
    initiated = "initiated"
    in_process = "in_process"
    settled = "settled"
    failed = "failed"
    reversed = "reversed"
    cancelled = "cancelled"
