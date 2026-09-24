from django.db import models

# ======================================================================
#
# Encapsulates data for model KycStatus
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class KycStatus Declaration (enumerated type)
# ======================================================================
from enum import Enum


class KycStatus(Enum):  # A subclass of Enum
    pending = "pending"
    verified = "verified"
    rejected = "rejected"
    expired = "expired"
