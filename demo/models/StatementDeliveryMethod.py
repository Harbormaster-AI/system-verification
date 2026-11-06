# ======================================================================
#
# Encapsulates data for model StatementDeliveryMethod
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class StatementDeliveryMethod Declaration (enumerated type)
# ======================================================================
from enum import Enum


class StatementDeliveryMethod(Enum):  # A subclass of Enum
    electronic = "electronic"
    paper = "paper"
