# ======================================================================
#
# Encapsulates data for model InstallmentStatus
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class InstallmentStatus Declaration (enumerated type)
# ======================================================================
from enum import Enum


class InstallmentStatus(Enum):  # A subclass of Enum
    due = "due"
    paid = "paid"
    overdue = "overdue"
    deferred = "deferred"
