from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Consent import Consent
from demo.models.Customer import Customer
from demo.models.Bank import Bank
from demo.models.Account import Account
from demo.models.ThirdPartyProvider import ThirdPartyProvider
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Consent
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ConsentDelegate Declaration
#======================================================================
class ConsentDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, consentId ):
		try:	
			consent = Consent.objects.filter(id=consentId)
			return consent.first();
		except Consent.DoesNotExist:
			raise ProcessingError("Consent with id " + str(consentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, consent):
		for model in serializers.deserialize("json", consent):
			model.save()
			return model;

	def create(self, consent):
		consent.save()
		return consent;

	def saveFromJson(self, consent):
		for model in serializers.deserialize("json", consent):
			model.save()
			return consent;
	
	def save(self, consent):
		consent.save()
		return consent;
	
	def delete(self, consentId ):
		errMsg = "Failed to delete Consent from db using id " + str(consentId)
		
		try:
			consent = Consent.objects.get(id=consentId)
			consent.delete()
			return True
		except Consent.DoesNotExist:
			raise ProcessingError("Consent with id " + str(consentId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Consent.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Consent from db")
		except Exception:
			return None;
		
	def assignCustomer( self, consentId, customerId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to assign element " + str(customerId) + " for Customer on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# get the Customer from db
			customer = CustomerDelegate().get(customerId).first();
			
			# assign the Customer		
			consent.customer = customer
			
			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignCustomer( self, consentId ):
		errMsg = "Failed to unassign element " + str(customerId) + " for Customer on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# assign to None for unassignment
			consent.customer = None			

			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Exception:
			return None;
		
	def assignBank( self, consentId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			consent.bank = bank
			
			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, consentId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# assign to None for unassignment
			consent.bank = None			

			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Exception:
			return None;
		
	def assignThirdPartyProvider( self, consentId, thirdPartyProviderId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

		errMsg = "Failed to assign element " + str(thirdPartyProviderId) + " for ThirdPartyProvider on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# get the ThirdPartyProvider from db
			thirdPartyProvider = ThirdPartyProviderDelegate().get(thirdPartyProviderId).first();
			
			# assign the ThirdPartyProvider		
			consent.thirdPartyProvider = thirdPartyProvider
			
			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignThirdPartyProvider( self, consentId ):
		errMsg = "Failed to unassign element " + str(thirdPartyProviderId) + " for ThirdPartyProvider on Consent"

		try:
			# get the Consent from db
			consent = self.get( consentId ).first()	
			
			# assign to None for unassignment
			consent.thirdPartyProvider = None			

			#save it
			consent.save()

			# reload and return the appropriate version					
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Exception:
			return None;
		
	def addAuthorizedAccounts( self, consentId, authorizedAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to add elements " + str(authorizedAccountsIds) + " for AuthorizedAccounts on Consent"

		try:
			# get the Consent
			consent = self.get( consentId ).first()
				
			# split on a comma with no spaces
			idList = authorizedAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				consent.authorizedAccounts.add(account)
				
			# save it		
			consent.save()
			
			# reload and return the appropriate version
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAuthorizedAccounts( self, consentId, authorizedAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to remove elements " + str(authorizedAccountsIds) + " for AuthorizedAccounts on Consent"

		try:
			# get the Consent
			consent = self.get( consentId ).first()
				
			# split on a comma with no spaces
			idList = authorizedAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				consent.authorizedAccounts.remove(account)
				
			# save it		
			consent.save()
			
			# reload and return the appropriate version
			return self.get( consentId );
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent with id " + str(consentId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
