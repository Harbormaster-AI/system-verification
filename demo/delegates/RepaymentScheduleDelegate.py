from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.RepaymentSchedule import RepaymentSchedule
from demo.models.LoanAccount import LoanAccount
from demo.models.LoanPayment import LoanPayment
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model RepaymentSchedule
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RepaymentScheduleDelegate Declaration
#======================================================================
class RepaymentScheduleDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, repaymentScheduleId ):
		try:	
			repaymentSchedule = RepaymentSchedule.objects.filter(id=repaymentScheduleId)
			return repaymentSchedule.first();
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError("RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, repaymentSchedule):
		for model in serializers.deserialize("json", repaymentSchedule):
			model.save()
			return model;

	def create(self, repaymentSchedule):
		repaymentSchedule.save()
		return repaymentSchedule;

	def saveFromJson(self, repaymentSchedule):
		for model in serializers.deserialize("json", repaymentSchedule):
			model.save()
			return repaymentSchedule;
	
	def save(self, repaymentSchedule):
		repaymentSchedule.save()
		return repaymentSchedule;
	
	def delete(self, repaymentScheduleId ):
		errMsg = "Failed to delete RepaymentSchedule from db using id " + str(repaymentScheduleId)
		
		try:
			repaymentSchedule = RepaymentSchedule.objects.get(id=repaymentScheduleId)
			repaymentSchedule.delete()
			return True
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError("RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = RepaymentSchedule.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all RepaymentSchedule from db")
		except Exception:
			return None;
		
	def assignLoanAccount( self, repaymentScheduleId, loanAccountId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to assign element " + str(loanAccountId) + " for LoanAccount on RepaymentSchedule"

		try:
			# get the RepaymentSchedule from db
			repaymentSchedule = self.get( repaymentScheduleId ).first()	
			
			# get the LoanAccount from db
			loanAccount = LoanAccountDelegate().get(loanAccountId).first();
			
			# assign the LoanAccount		
			repaymentSchedule.loanAccount = loanAccount
			
			#save it
			repaymentSchedule.save()

			# reload and return the appropriate version					
			return self.get( repaymentScheduleId );
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignLoanAccount( self, repaymentScheduleId ):
		errMsg = "Failed to unassign element " + str(loanAccountId) + " for LoanAccount on RepaymentSchedule"

		try:
			# get the RepaymentSchedule from db
			repaymentSchedule = self.get( repaymentScheduleId ).first()	
			
			# assign to None for unassignment
			repaymentSchedule.loanAccount = None			

			#save it
			repaymentSchedule.save()

			# reload and return the appropriate version					
			return self.get( repaymentScheduleId );
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except Exception:
			return None;
		
	def assignPayment( self, repaymentScheduleId, paymentId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanPaymentDelegate import LoanPaymentDelegate

		errMsg = "Failed to assign element " + str(paymentId) + " for Payment on RepaymentSchedule"

		try:
			# get the RepaymentSchedule from db
			repaymentSchedule = self.get( repaymentScheduleId ).first()	
			
			# get the LoanPayment from db
			loanPayment = LoanPaymentDelegate().get(paymentId).first();
			
			# assign the Payment		
			repaymentSchedule.payment = loanPayment
			
			#save it
			repaymentSchedule.save()

			# reload and return the appropriate version					
			return self.get( repaymentScheduleId );
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment with id " + str(paymentId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignPayment( self, repaymentScheduleId ):
		errMsg = "Failed to unassign element " + str(paymentId) + " for Payment on RepaymentSchedule"

		try:
			# get the RepaymentSchedule from db
			repaymentSchedule = self.get( repaymentScheduleId ).first()	
			
			# assign to None for unassignment
			repaymentSchedule.loanPayment = None			

			#save it
			repaymentSchedule.save()

			# reload and return the appropriate version					
			return self.get( repaymentScheduleId );
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule with id " + str(repaymentScheduleId) + " does not exist.")
		except Exception:
			return None;
		
