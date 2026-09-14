from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.StandingInstruction import StandingInstruction
from demo.models.Account import Account
from demo.models.ExternalAccount import ExternalAccount
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model StandingInstruction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class StandingInstructionDelegate Declaration
#======================================================================
class StandingInstructionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, standingInstructionId ):
		try:	
			standingInstruction = StandingInstruction.objects.filter(id=standingInstructionId)
			return standingInstruction.first();
		except StandingInstruction.DoesNotExist:
			raise ProcessingError("StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, standingInstruction):
		for model in serializers.deserialize("json", standingInstruction):
			model.save()
			return model;

	def create(self, standingInstruction):
		standingInstruction.save()
		return standingInstruction;

	def saveFromJson(self, standingInstruction):
		for model in serializers.deserialize("json", standingInstruction):
			model.save()
			return standingInstruction;
	
	def save(self, standingInstruction):
		standingInstruction.save()
		return standingInstruction;
	
	def delete(self, standingInstructionId ):
		errMsg = "Failed to delete StandingInstruction from db using id " + str(standingInstructionId)
		
		try:
			standingInstruction = StandingInstruction.objects.get(id=standingInstructionId)
			standingInstruction.delete()
			return True
		except StandingInstruction.DoesNotExist:
			raise ProcessingError("StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = StandingInstruction.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all StandingInstruction from db")
		except Exception:
			return None;
		
	def assignAccount( self, standingInstructionId, accountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to assign element " + str(accountId) + " for Account on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standingInstruction = self.get( standingInstructionId ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			standingInstruction.account = account
			
			#save it
			standingInstruction.save()

			# reload and return the appropriate version					
			return self.get( standingInstructionId );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, standingInstructionId ):
		errMsg = "Failed to unassign element " + str(accountId) + " for Account on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standingInstruction = self.get( standingInstructionId ).first()	
			
			# assign to None for unassignment
			standingInstruction.account = None			

			#save it
			standingInstruction.save()

			# reload and return the appropriate version					
			return self.get( standingInstructionId );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except Exception:
			return None;
		
	def assignBeneficiary( self, standingInstructionId, beneficiaryId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		errMsg = "Failed to assign element " + str(beneficiaryId) + " for Beneficiary on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standingInstruction = self.get( standingInstructionId ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(beneficiaryId).first();
			
			# assign the Beneficiary		
			standingInstruction.beneficiary = externalAccount
			
			#save it
			standingInstruction.save()

			# reload and return the appropriate version					
			return self.get( standingInstructionId );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount with id " + str(beneficiaryId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBeneficiary( self, standingInstructionId ):
		errMsg = "Failed to unassign element " + str(beneficiaryId) + " for Beneficiary on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standingInstruction = self.get( standingInstructionId ).first()	
			
			# assign to None for unassignment
			standingInstruction.externalAccount = None			

			#save it
			standingInstruction.save()

			# reload and return the appropriate version					
			return self.get( standingInstructionId );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(errMsg + " : StandingInstruction with id " + str(standingInstructionId) + " does not exist.")
		except Exception:
			return None;
		
