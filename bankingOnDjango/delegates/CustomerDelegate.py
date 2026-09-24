

from django.core import serializers
from django.db import models
from django.db import utils

from bankingOnDjango.models.Customer import Customer
from bankingOnDjango.models.Bank import Bank
from bankingOnDjango.models.Account import Account
from bankingOnDjango.models.LoanAccount import LoanAccount
from bankingOnDjango.models.PaymentCard import PaymentCard
from bankingOnDjango.models.ExternalAccount import ExternalAccount
from bankingOnDjango.models.FundsTransfer import FundsTransfer
from bankingOnDjango.models.Dispute import Dispute
from bankingOnDjango.models.KycProfile import KycProfile
from bankingOnDjango.models.Consent import Consent
from bankingOnDjango.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Customer
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CustomerDelegate Declaration
#======================================================================
class CustomerDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, customer_id ):
		err_msg = "Failed to get Customer from db using id " + str(customer_id)
		try:	
			customer = Customer.objects.filter(id=customer_id)
			return customer.first();
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError("Customer with id " + str(customer_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 

	def createFromJson(self, customer):
		for model in serializers.deserialize("json", customer):
			model.save()
			return model;

	def create(self, customer):
		customer.save()
		return customer;

	def saveFromJson(self, customer):
		for model in serializers.deserialize("json", customer):
			model.save()
			return customer;
	
	def save(self, customer):
		customer.save()
		return customer;
	
	def delete(self, customer_id ):
		err_msg = "Failed to delete Customer from db using id " + str(customer_id)
		
		try:
			customer = Customer.objects.get(id=customer_id)
			customer.delete()
			return True
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError("Customer with id " + str(customer_id) + " does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Customer.objects.all()
			return all;
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageReadError("Failed to get all Customer from db")
		except Exception:
			return None;
		
	def assignBank( self, customer_id, bank_id ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bank_id) + " for Bank on Customer"

		try:
			# get the Customer from db
			customer = self.get( customer_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bank_id).first();
			
			# assign the Bank		
			customer.bank = bank
			
			#save it
			customer.save()

			# reload and return the appropriate version					
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Bank with id " + str(bank_id) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, customer_id ):
		err_msg = "Failed to unassign element " + str(bank_id) + " for Bank on Customer"

		try:
			# get the Customer from db
			customer = self.get( customer_id ).first()	
			
			# assign to None for unassignment
			customer.bank = None			

			#save it
			customer.save()

			# reload and return the appropriate version					
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, customer_id, accounts_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to add elements " + str(accounts_ids) + " for Accounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in accounts_ids:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				customer.accounts.add(account)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeAccounts( self, customer_id, accounts_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Account does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addLoanAccounts( self, customer_id, loanAccounts_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to add elements " + str(loanAccounts_ids) + " for LoanAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in loanAccounts_ids:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				customer.loanAccounts.add(loanAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeLoanAccounts( self, customer_id, loanAccounts_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : LoanAccount does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addPaymentCards( self, customer_id, paymentCards_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to add elements " + str(paymentCards_ids) + " for PaymentCards on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in paymentCards_ids:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				customer.paymentCards.add(paymentCard)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removePaymentCards( self, customer_id, paymentCards_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : PaymentCard does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addExternalAccounts( self, customer_id, externalAccounts_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to add elements " + str(externalAccounts_ids) + " for ExternalAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in externalAccounts_ids:
				# read the ExternalAccount		
				externalAccount = ExternalAccountDelegate().get(id).first();	
				# add the ExternalAccount
				customer.externalAccounts.add(externalAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ExternalAccount does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeExternalAccounts( self, customer_id, externalAccounts_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : ExternalAccount does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addFundsTransfers( self, customer_id, fundsTransfers_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

		err_msg = "Failed to add elements " + str(fundsTransfers_ids) + " for FundsTransfers on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in fundsTransfers_ids:
				# read the FundsTransfer		
				fundsTransfer = FundsTransferDelegate().get(id).first();	
				# add the FundsTransfer
				customer.fundsTransfers.add(fundsTransfer)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FundsTransfer does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeFundsTransfers( self, customer_id, fundsTransfers_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : FundsTransfer does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addDisputes( self, customer_id, disputes_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

		err_msg = "Failed to add elements " + str(disputes_ids) + " for Disputes on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in disputes_ids:
				# read the Dispute		
				dispute = DisputeDelegate().get(id).first();	
				# add the Dispute
				customer.disputes.add(dispute)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Dispute.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Dispute does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeDisputes( self, customer_id, disputes_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Dispute.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Dispute does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addKycProfiles( self, customer_id, kycProfiles_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

		err_msg = "Failed to add elements " + str(kycProfiles_ids) + " for KycProfiles on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in kycProfiles_ids:
				# read the KycProfile		
				kycProfile = KycProfileDelegate().get(id).first();	
				# add the KycProfile
				customer.kycProfiles.add(kycProfile)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeKycProfiles( self, customer_id, kycProfiles_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : KycProfile does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
	def addConsents( self, customer_id, consents_ids ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

		err_msg = "Failed to add elements " + str(consents_ids) + " for Consents on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in consents_ids:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				customer.consents.add(consent)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
		except Exception:
			raise Exceptions.ProcessingError(err_msg) 
		
	def removeConsents( self, customer_id, consents_ids ):
		# lazy importing avoids circular dependenciesId
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise Exceptions.ProcessingError(err_msg + " : Consent does not exist.")
		except utils.Exceptions.DatabaseError:
			raise Exceptions.StorageWriteError()
		except Exception:
			raise Exceptions.GeneralError(err_msg) 
		
