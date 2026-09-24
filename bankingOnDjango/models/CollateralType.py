from django.db import models

# ======================================================================
#
# Encapsulates data for model CollateralType
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class CollateralType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class CollateralType(Enum):  # A subclass of Enum
    real_estate = "real_estate"
    vehicle = "vehicle"
    cash = "cash"
    securities = "securities"
    guarantee = "guarantee"
    equipment = "equipment"
