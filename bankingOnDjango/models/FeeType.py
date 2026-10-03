# ======================================================================
#
# Encapsulates data for model FeeType
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class FeeType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class FeeType(Enum):  # A subclass of Enum
    maintenance = "maintenance"
    overdraft = "overdraft"
    wire = "wire"
    a_t_m = "a_t_m"
    card_annual = "card_annual"
    late_payment = "late_payment"
    early_withdrawal = "early_withdrawal"
    replacement_card = "replacement_card"
