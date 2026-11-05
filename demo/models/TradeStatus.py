# ======================================================================
#
# Encapsulates data for model TradeStatus
#
# @author your_name_here
#
# ======================================================================

# ======================================================================
# Class TradeStatus Declaration (enumerated type)
# ======================================================================
from enum import Enum


class TradeStatus(Enum):  # A subclass of Enum
    booked = "booked"
    settled = "settled"
    cancelled = "cancelled"
