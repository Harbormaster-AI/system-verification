from django.db import models
 #======================================================================
# 
# Encapsulates data for model CertificateType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CertificateType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class CertificateType(Enum):   # A subclass of Enum
	X509 = 'X509'
	X509_CA = 'X509_CA'
	X509_SelfSigned = 'X509_SelfSigned'
