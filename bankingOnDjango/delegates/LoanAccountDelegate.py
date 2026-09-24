

from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Branch import Branch
from bankingOnDjango.models.BankingProduct import BankingProduct
from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.RepaymentSchedule import RepaymentSchedule
from bankingOnDjango.models.LoanPayment import LoanPayment
from bankingOnDjango.models.Collateral import Collateral
from bankingOnDjango.models.FeeCharge import FeeCharge
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model LoanAccount
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class LoanAccountDelegate Declaration
#======================================================================
class LoanAccountDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, loan_account_id ):
		err_msg = "Failed to get LoanAccount from db using id " + str(loan_account_id)
		try:	
			loan_account = LoanAccount.objects.filter(id=loan_account_id)
			return loan_account.first();
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, loan_account):
		for model in serializers.deserialize("json", loan_account):
			model.save()
			return model;

	def create(self, loan_account):
		loan_account.save()
		return loan_account;

	def saveFromJson(self, loan_account):
		for model in serializers.deserialize("json", loan_account):
			model.save()
			return loan_account;
	
	def save(self, loan_account):
		loan_account.save()
		return loan_account;
	
	def delete(self, loan_account_id ):
		err_msg = "Failed to delete LoanAccount from db using id " + str(loan_account_id)
		
		try:
			loan_account = LoanAccount.objects.get(id=loan_account_id)
			loan_account.delete()
			return True
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = LoanAccount.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all LoanAccount from db")
		except Exception:
			return None;
		
	def assignBank( self, loan_account_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bank_id).first();
			
			# assign the Bank		
			loan_account.bank = bank
			
			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, loan_account_id ):
		err_msg = "Failed to unassign element " + str(loan_account_id) + " for Bank on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# assign to None for unassignment
			loan_account.bank = None			

			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignBranch( self, loan_account_id, branch_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

		err_msg = "Failed to assign element " + str(branch_id) + " for Branch on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# get the Branch from db
			branch = BranchDelegate().get(branch_id).first();
			
			# assign the Branch		
			loan_account.branch = branch
			
			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Branch.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Branch with id " + str(branch_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBranch( self, loan_account_id ):
		err_msg = "Failed to unassign element " + str(loan_account_id) + " for Branch on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# assign to None for unassignment
			loan_account.branch = None			

			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Exception:
			return None;
		
	def assignProduct( self, loan_account_id, product_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

		err_msg = "Failed to assign element " + str(product_id) + " for Product on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# get the BankingProduct from db
			banking_product = BankingProductDelegate().get(product_id).first();
			
			# assign the Product		
			loan_account.product = banking_product
			
			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except BankingProduct.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : BankingProduct with id " + str(product_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignProduct( self, loan_account_id ):
		err_msg = "Failed to unassign element " + str(loan_account_id) + " for Product on LoanAccount"

		try:
			# get the LoanAccount from db
			loan_account = self.get( loan_account_id ).first()	
			
			# assign to None for unassignment
			loan_account.banking_product = None			

			#save it
			loan_account.save()

			# reload and return the appropriate version					
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Exception:
			return None;
		
	def addBorrowers( self, loan_account_id, borrowers_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CustomerDelegate import CustomerDelegate

		err_msg = "Failed to add elements " + str(borrowers_ids) + " for Borrowers on LoanAccount"

		try:
			# get the LoanAccount
			loan_account = self.get( loan_account_id ).first()
				
			# iterate over ids
			for id in borrowers_ids:
				# read the Customer		
				customer = CustomerDelegate().get(id).first();	
				# add the Customer
				loan_account.borrowers.add(customer)
				
			# save it		
			loan_account.save()
			
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeBorrowers( self, loan_account_id, borrowers_ids ):
		# lazy importing avoids circular dependenciesId
		try:
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError("Customer with id " + str(borrowers_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addRepaymentSchedule( self, loan_account_id, repayment_schedule_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

		err_msg = "Failed to add elements " + str(repayment_schedule_ids) + " for RepaymentSchedule on LoanAccount"

		try:
			# get the LoanAccount
			loan_account = self.get( loan_account_id ).first()
				
			# iterate over ids
			for id in repayment_schedule_ids:
				# read the RepaymentSchedule		
				repayment_schedule = RepaymentScheduleDelegate().get(id).first();	
				# add the RepaymentSchedule
				loan_account.repayment_schedule.add(repayment_schedule)
				
			# save it		
			loan_account.save()
			
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except RepaymentSchedule.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : RepaymentSchedule does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeRepaymentSchedule( self, loan_account_id, repayment_schedule_ids ):
		# lazy importing avoids circular dependenciesId
		try:
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except RepaymentSchedule.DoesNotExist:
			raise Exceptions.ProcessingError("RepaymentSchedule with id " + str(repayment_schedule_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addPayments( self, loan_account_id, payments_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanPaymentDelegate import LoanPaymentDelegate

		err_msg = "Failed to add elements " + str(payments_ids) + " for Payments on LoanAccount"

		try:
			# get the LoanAccount
			loan_account = self.get( loan_account_id ).first()
				
			# iterate over ids
			for id in payments_ids:
				# read the LoanPayment		
				loan_payment = LoanPaymentDelegate().get(id).first();	
				# add the LoanPayment
				loan_account.payments.add(loan_payment)
				
			# save it		
			loan_account.save()
			
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except LoanPayment.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanPayment does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removePayments( self, loan_account_id, payments_ids ):
		# lazy importing avoids circular dependenciesId
		try:
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except LoanPayment.DoesNotExist:
			raise Exceptions.ProcessingError("LoanPayment with id " + str(payments_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addCollateral( self, loan_account_id, collateral_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.CollateralDelegate import CollateralDelegate

		err_msg = "Failed to add elements " + str(collateral_ids) + " for Collateral on LoanAccount"

		try:
			# get the LoanAccount
			loan_account = self.get( loan_account_id ).first()
				
			# iterate over ids
			for id in collateral_ids:
				# read the Collateral		
				collateral = CollateralDelegate().get(id).first();	
				# add the Collateral
				loan_account.collateral.add(collateral)
				
			# save it		
			loan_account.save()
			
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Collateral does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeCollateral( self, loan_account_id, collateral_ids ):
		# lazy importing avoids circular dependenciesId
		try:
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except Collateral.DoesNotExist:
			raise Exceptions.ProcessingError("Collateral with id " + str(collateral_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addFeeCharges( self, loan_account_id, fee_charges_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

		err_msg = "Failed to add elements " + str(fee_charges_ids) + " for FeeCharges on LoanAccount"

		try:
			# get the LoanAccount
			loan_account = self.get( loan_account_id ).first()
				
			# iterate over ids
			for id in fee_charges_ids:
				# read the FeeCharge		
				fee_charge = FeeChargeDelegate().get(id).first();	
				# add the FeeCharge
				loan_account.fee_charges.add(fee_charge)
				
			# save it		
			loan_account.save()
			
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FeeCharge does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeFeeCharges( self, loan_account_id, fee_charges_ids ):
		# lazy importing avoids circular dependenciesId
		try:
			# reload and return the appropriate version
			return self.get( loan_account_id );
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError("LoanAccount with id " + str(loan_account_id) + " does not exist.")
		except FeeCharge.DoesNotExist:
			raise Exceptions.ProcessingError("FeeCharge with id " + str(fee_charges_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
