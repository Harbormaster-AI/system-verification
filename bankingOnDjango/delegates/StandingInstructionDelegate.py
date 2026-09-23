
from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.StandingInstruction import StandingInstruction
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model StandingInstruction
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class StandingInstructionDelegate Declaration
#======================================================================
class StandingInstructionDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, standing_instruction_id ):
		try:	
			standing_instruction = StandingInstruction.objects.filter(id=standing_instruction_id)
			return standing_instruction.first();
		except StandingInstruction.DoesNotExist:
			raise ProcessingError("StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 

	def createFromJson(self, standing_instruction):
		for model in serializers.deserialize("json", standing_instruction):
			model.save()
			return model;

	def create(self, standing_instruction):
		standing_instruction.save()
		return standing_instruction;

	def saveFromJson(self, standing_instruction):
		for model in serializers.deserialize("json", standing_instruction):
			model.save()
			return standing_instruction;
	
	def save(self, standing_instruction):
		standing_instruction.save()
		return standing_instruction;
	
	def delete(self, standing_instruction_id ):
		err_msg = "Failed to delete StandingInstruction from db using id " + str(standing_instruction_id)
		
		try:
			standing_instruction = StandingInstruction.objects.get(id=standing_instruction_id)
			standing_instruction.delete()
			return True
		except StandingInstruction.DoesNotExist:
			raise ProcessingError("StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = StandingInstruction.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all StandingInstruction from db")
		except Exception:
			return None;
		
	def assignAccount( self, standing_instruction_id, accountId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to assign element " + str(accountId) + " for Account on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standing_instruction = self.get( standing_instruction_id ).first()	
			
			# get the Account from db
			account = AccountDelegate().get(accountId).first();
			
			# assign the Account		
			standing_instruction.account = account
			
			#save it
			standing_instruction.save()

			# reload and return the appropriate version					
			return self.get( standing_instruction_id );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(err_msg + " : StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account with id " + str(accountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignAccount( self, standing_instruction_id ):
		err_msg = "Failed to unassign element " + str(accountId) + " for Account on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standing_instruction = self.get( standing_instruction_id ).first()	
			
			# assign to None for unassignment
			standing_instruction.account = None			

			#save it
			standing_instruction.save()

			# reload and return the appropriate version					
			return self.get( standing_instruction_id );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(err_msg + " : StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignBeneficiary( self, standing_instruction_id, beneficiaryId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to assign element " + str(beneficiaryId) + " for Beneficiary on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standing_instruction = self.get( standing_instruction_id ).first()	
			
			# get the ExternalAccount from db
			externalAccount = ExternalAccountDelegate().get(beneficiaryId).first();
			
			# assign the Beneficiary		
			standing_instruction.beneficiary = externalAccount
			
			#save it
			standing_instruction.save()

			# reload and return the appropriate version					
			return self.get( standing_instruction_id );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(err_msg + " : StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : ExternalAccount with id " + str(beneficiaryId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBeneficiary( self, standing_instruction_id ):
		err_msg = "Failed to unassign element " + str(beneficiaryId) + " for Beneficiary on StandingInstruction"

		try:
			# get the StandingInstruction from db
			standing_instruction = self.get( standing_instruction_id ).first()	
			
			# assign to None for unassignment
			standing_instruction.externalAccount = None			

			#save it
			standing_instruction.save()

			# reload and return the appropriate version					
			return self.get( standing_instruction_id );
		except StandingInstruction.DoesNotExist:
			raise ProcessingError(err_msg + " : StandingInstruction with id " + str(standing_instruction_id) + " does not exist.")
		except Exception:
			return None;
		
