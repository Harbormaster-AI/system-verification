from django.db import models

# ======================================================================
#
# Encapsulates data for model PaymentStatus
#
# @author Harbormaster Dev Team
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
