import datetime

from django.test import TestCase
from django.utils import timezone
from demo.models.IdentityDocument import IdentityDocument
from demo.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

 #======================================================================
# 
# Encapsulates data for model IdentityDocument
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class IdentityDocumentTest Declaration
#======================================================================
class IdentityDocumentTest (TestCase) :
	def test_crud(self) :
		identityDocument = IdentityDocument()
		identityDocument.documentNumber = "default documentNumber field value"
		identityDocument.issuingCountry = "default issuingCountry field value"
		identityDocument.expirationDate = datetime.datetime.now()
		identityDocument.documentType = "default documentType field value"
		
		delegate = IdentityDocumentDelegate()
		responseObj = delegate.create(identityDocument)
		
		self.assertEqual(responseObj, delegate.get( responseObj.id ))
	
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 1 )		
		delegate.delete(responseObj.id)
		
		allObj = delegate.getAll()
		self.assertEqual(allObj.count(), 0 )		


