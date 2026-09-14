from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.ThirdPartyProvider import ThirdPartyProvider
from demo.models.Bank import Bank
from demo.models.Consent import Consent
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ThirdPartyProvider
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ThirdPartyProviderDelegate Declaration
#======================================================================
class ThirdPartyProviderDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, thirdPartyProviderId ):
		try:	
			thirdPartyProvider = ThirdPartyProvider.objects.filter(id=thirdPartyProviderId)
			return thirdPartyProvider.first();
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError("ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, thirdPartyProvider):
		for model in serializers.deserialize("json", thirdPartyProvider):
			model.save()
			return model;

	def create(self, thirdPartyProvider):
		thirdPartyProvider.save()
		return thirdPartyProvider;

	def saveFromJson(self, thirdPartyProvider):
		for model in serializers.deserialize("json", thirdPartyProvider):
			model.save()
			return thirdPartyProvider;
	
	def save(self, thirdPartyProvider):
		thirdPartyProvider.save()
		return thirdPartyProvider;
	
	def delete(self, thirdPartyProviderId ):
		errMsg = "Failed to delete ThirdPartyProvider from db using id " + str(thirdPartyProviderId)
		
		try:
			thirdPartyProvider = ThirdPartyProvider.objects.get(id=thirdPartyProviderId)
			thirdPartyProvider.delete()
			return True
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError("ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ThirdPartyProvider.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ThirdPartyProvider from db")
		except Exception:
			return None;
		
	def assignBank( self, thirdPartyProviderId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on ThirdPartyProvider"

		try:
			# get the ThirdPartyProvider from db
			thirdPartyProvider = self.get( thirdPartyProviderId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			thirdPartyProvider.bank = bank
			
			#save it
			thirdPartyProvider.save()

			# reload and return the appropriate version					
			return self.get( thirdPartyProviderId );
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, thirdPartyProviderId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on ThirdPartyProvider"

		try:
			# get the ThirdPartyProvider from db
			thirdPartyProvider = self.get( thirdPartyProviderId ).first()	
			
			# assign to None for unassignment
			thirdPartyProvider.bank = None			

			#save it
			thirdPartyProvider.save()

			# reload and return the appropriate version					
			return self.get( thirdPartyProviderId );
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except Exception:
			return None;
		
	def addConsents( self, thirdPartyProviderId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to add elements " + str(consentsIds) + " for Consents on ThirdPartyProvider"

		try:
			# get the ThirdPartyProvider
			thirdPartyProvider = self.get( thirdPartyProviderId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				thirdPartyProvider.consents.add(consent)
				
			# save it		
			thirdPartyProvider.save()
			
			# reload and return the appropriate version
			return self.get( thirdPartyProviderId );
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeConsents( self, thirdPartyProviderId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to remove elements " + str(consentsIds) + " for Consents on ThirdPartyProvider"

		try:
			# get the ThirdPartyProvider
			thirdPartyProvider = self.get( thirdPartyProviderId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				thirdPartyProvider.consents.remove(consent)
				
			# save it		
			thirdPartyProvider.save()
			
			# reload and return the appropriate version
			return self.get( thirdPartyProviderId );
		except ThirdPartyProvider.DoesNotExist:
			raise ProcessingError(errMsg + " : ThirdPartyProvider with id " + str(thirdPartyProviderId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
