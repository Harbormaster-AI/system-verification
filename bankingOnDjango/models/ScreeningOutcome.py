from django.db import models

# ======================================================================
#
# Encapsulates data for model ScreeningOutcome
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class ScreeningOutcome Declaration (enumerated type)
# ======================================================================
from enum import Enum


class ScreeningOutcome(Enum):  # A subclass of Enum
    clear = "clear"
    match = "match"
    review = "review"
