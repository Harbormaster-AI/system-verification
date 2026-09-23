from django.db import models

# ======================================================================
#
# Encapsulates data for model LoanType
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class LoanType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class LoanType(Enum):  # A subclass of Enum
    mortgage = "mortgage"
    personal = "personal"
    auto = "auto"
    small_business = "small_business"
    credit_line = "credit_line"
    student = "student"
