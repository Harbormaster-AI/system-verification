# ======================================================================
#
# Encapsulates data for model RiskRating
#
# @author your_name_here
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
