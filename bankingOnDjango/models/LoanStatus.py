# ======================================================================
#
# Encapsulates data for model LoanStatus
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class LoanStatus Declaration (enumerated type)
# ======================================================================
from enum import Enum


class LoanStatus(Enum):  # A subclass of Enum
    applied = "applied"
    approved = "approved"
    active = "active"
    delinquent = "delinquent"
    defaulted = "defaulted"
    closed = "closed"
