from django.db import models
 #======================================================================
# 
# Encapsulates data for model IdentityDocumentType
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class IdentityDocumentType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class IdentityDocumentType(Enum):   # A subclass of Enum
	Passport = 'Passport'
	NationalID = 'NationalID'
	DriverLicense = 'DriverLicense'
	ResidencePermit = 'ResidencePermit'
	BusinessRegistration = 'BusinessRegistration'
	TaxCertificate = 'TaxCertificate'
