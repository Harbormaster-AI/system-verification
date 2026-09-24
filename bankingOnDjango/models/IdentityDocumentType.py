# ======================================================================
#
# Encapsulates data for model IdentityDocumentType
#
# @author Harbormaster Dev Team
#
# ======================================================================

# ======================================================================
# Class IdentityDocumentType Declaration (enumerated type)
# ======================================================================
from enum import Enum


class IdentityDocumentType(Enum):  # A subclass of Enum
    passport = "passport"
    national_i_d = "national_i_d"
    driver_license = "driver_license"
    residence_permit = "residence_permit"
    business_registration = "business_registration"
    tax_certificate = "tax_certificate"
