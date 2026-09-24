# ======================================================================
#
# Encapsulates data for model RiskRating
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class RiskRating Declaration (enumerated type)
# ======================================================================
from enum import Enum


class RiskRating(Enum):  # A subclass of Enum
    low = "low"
    medium = "medium"
    high = "high"
