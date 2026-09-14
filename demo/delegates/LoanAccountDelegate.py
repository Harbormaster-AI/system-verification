from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.LoanAccount import LoanAccount
from demo.models.Bank import Bank
from demo.models.Branch import Branch
from demo.models.BankingProduct import BankingProduct
from demo.models.Customer import Customer
from demo.models.RepaymentSchedule import RepaymentSchedule
from demo.models.LoanPayment import LoanPayment
from demo.models.Collateral import Collateral
from demo.models.FeeCharge import FeeCharge
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model LoanAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class LoanAccountDelegate Declaration
#======================================================================
class LoanAccountDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, loanAccountId ):
		try:	
			loanAccount = LoanAccount.objects.filter(id=loanAccountId)
			return loanAccount.first();
		except LoanAccount.DoesNotExist:
			raise ProcessingError("LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, loanAccount):
		for model in serializers.deserialize("json", loanAccount):
			model.save()
			return model;

	def create(self, loanAccount):
		loanAccount.save()
		return loanAccount;

	def saveFromJson(self, loanAccount):
		for model in serializers.deserialize("json", loanAccount):
			model.save()
			return loanAccount;
	
	def save(self, loanAccount):
		loanAccount.save()
		return loanAccount;
	
	def delete(self, loanAccountId ):
		errMsg = "Failed to delete LoanAccount from db using id " + str(loanAccountId)
		
		try:
			loanAccount = LoanAccount.objects.get(id=loanAccountId)
			loanAccount.delete()
			return True
		except LoanAccount.DoesNotExist:
			raise ProcessingError("LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = LoanAccount.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all LoanAccount from db")
		except Exception:
			return None;
		
	def assignBank( self, loanAccountId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			loanAccount.bank = bank
			
			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, loanAccountId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# assign to None for unassignment
			loanAccount.bank = None			

			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
		
	def assignBranch( self, loanAccountId, branchId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BranchDelegate import BranchDelegate

		errMsg = "Failed to assign element " + str(branchId) + " for Branch on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branchId).first();
			
			# assign the Branch		
			loanAccount.branch = branch
			
			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Branch.DoesNotExist:
			raise ProcessingError(errMsg + " : Branch with id " + str(branchId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, loanAccountId ):
		errMsg = "Failed to unassign element " + str(branchId) + " for Branch on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# assign to None for unassignment
			loanAccount.branch = None			

			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
		
	def assignProduct( self, loanAccountId, productId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankingProductDelegate import BankingProductDelegate

		errMsg = "Failed to assign element " + str(productId) + " for Product on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# get the BankingProduct from db
			bankingProduct = BankingProductDelegate().get(productId).first();
			
			# assign the Product		
			loanAccount.product = bankingProduct
			
			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise ProcessingError(errMsg + " : BankingProduct with id " + str(productId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignProduct( self, loanAccountId ):
		errMsg = "Failed to unassign element " + str(productId) + " for Product on LoanAccount"

		try:
			# get the LoanAccount from db
			loanAccount = self.get( loanAccountId ).first()	
			
			# assign to None for unassignment
			loanAccount.bankingProduct = None			

			#save it
			loanAccount.save()

			# reload and return the appropriate version					
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Exception:
			return None;
		
	def addBorrowers( self, loanAccountId, borrowersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to add elements " + str(borrowersIds) + " for Borrowers on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = borrowersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				loanAccount.borrowers.add(customer)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeBorrowers( self, loanAccountId, borrowersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CustomerDelegate import CustomerDelegate

		errMsg = "Failed to remove elements " + str(borrowersIds) + " for Borrowers on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = borrowersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				loanAccount.borrowers.remove(customer)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addRepaymentSchedule( self, loanAccountId, repaymentScheduleIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

		errMsg = "Failed to add elements " + str(repaymentScheduleIds) + " for RepaymentSchedule on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = repaymentScheduleIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the RepaymentSchedule		
				repaymentSchedule = RepaymentScheduleDelegate().get(id).first();	
				# add the RepaymentSchedule
				loanAccount.repaymentSchedule.add(repaymentSchedule)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeRepaymentSchedule( self, loanAccountId, repaymentScheduleIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

		errMsg = "Failed to remove elements " + str(repaymentScheduleIds) + " for RepaymentSchedule on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = repaymentScheduleIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the RepaymentSchedule		
				repaymentSchedule = RepaymentScheduleDelegate().get(id).first();	
				# add the RepaymentSchedule
				loanAccount.repaymentSchedule.remove(repaymentSchedule)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except RepaymentSchedule.DoesNotExist:
			raise ProcessingError(errMsg + " : RepaymentSchedule does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addPayments( self, loanAccountId, paymentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanPaymentDelegate import LoanPaymentDelegate

		errMsg = "Failed to add elements " + str(paymentsIds) + " for Payments on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = paymentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the LoanPayment		
				loanPayment = LoanPaymentDelegate().get(id).first();	
				# add the LoanPayment
				loanAccount.payments.add(loanPayment)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removePayments( self, loanAccountId, paymentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanPaymentDelegate import LoanPaymentDelegate

		errMsg = "Failed to remove elements " + str(paymentsIds) + " for Payments on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = paymentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the LoanPayment		
				loanPayment = LoanPaymentDelegate().get(id).first();	
				# add the LoanPayment
				loanAccount.payments.remove(loanPayment)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except LoanPayment.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanPayment does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addCollateral( self, loanAccountId, collateralIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CollateralDelegate import CollateralDelegate

		errMsg = "Failed to add elements " + str(collateralIds) + " for Collateral on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = collateralIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Collateral		
				collateral = CollateralDelegate().get(id).first();	
				# add the Collateral
				loanAccount.collateral.add(collateral)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Collateral.DoesNotExist:
			raise ProcessingError(errMsg + " : Collateral does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeCollateral( self, loanAccountId, collateralIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.CollateralDelegate import CollateralDelegate

		errMsg = "Failed to remove elements " + str(collateralIds) + " for Collateral on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = collateralIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Collateral		
				collateral = CollateralDelegate().get(id).first();	
				# add the Collateral
				loanAccount.collateral.remove(collateral)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except Collateral.DoesNotExist:
			raise ProcessingError(errMsg + " : Collateral does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addFeeCharges( self, loanAccountId, feeChargesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

		errMsg = "Failed to add elements " + str(feeChargesIds) + " for FeeCharges on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = feeChargesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FeeCharge		
				feeCharge = FeeChargeDelegate().get(id).first();	
				# add the FeeCharge
				loanAccount.feeCharges.add(feeCharge)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFeeCharges( self, loanAccountId, feeChargesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FeeChargeDelegate import FeeChargeDelegate

		errMsg = "Failed to remove elements " + str(feeChargesIds) + " for FeeCharges on LoanAccount"

		try:
			# get the LoanAccount
			loanAccount = self.get( loanAccountId ).first()
				
			# split on a comma with no spaces
			idList = feeChargesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FeeCharge		
				feeCharge = FeeChargeDelegate().get(id).first();	
				# add the FeeCharge
				loanAccount.feeCharges.remove(feeCharge)
				
			# save it		
			loanAccount.save()
			
			# reload and return the appropriate version
			return self.get( loanAccountId );
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount with id " + str(loanAccountId) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise ProcessingError(errMsg + " : FeeCharge does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
