
from django.core import exceptions
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
		try:	
			customer = Customer.objects.filter(id=customer_id)
			return customer.first();
		except Customer.DoesNotExist:
			raise ProcessingError("Customer with id " + str(customer_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 

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
			raise ProcessingError("Customer with id " + str(customer_id) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(err_msg) 
	
	def getAll(self):
		try:
			all = Customer.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Customer from db")
		except Exception:
			return None;
		
	def assignBank( self, customer_id, bankId ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.BankDelegate import BankDelegate

		err_msg = "Failed to assign element " + str(bankId) + " for Bank on Customer"

		try:
			# get the Customer from db
			customer = self.get( customer_id ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			customer.bank = bank
			
			#save it
			customer.save()

			# reload and return the appropriate version					
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(err_msg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, customer_id ):
		err_msg = "Failed to unassign element " + str(bankId) + " for Bank on Customer"

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
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, customer_id, accountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to add elements " + str(accountsIds) + " for Accounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in accountsIds:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				customer.accounts.add(account)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeAccounts( self, customer_id, accountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.AccountDelegate import AccountDelegate

		err_msg = "Failed to remove elements " + str(accountsIds) + " for Accounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in accountsIds:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				customer.accounts.remove(account)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(err_msg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addLoanAccounts( self, customer_id, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in loanAccountsIds:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				customer.loanAccounts.add(loanAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : LoanAccount does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeLoanAccounts( self, customer_id, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.LoanAccountDelegate import LoanAccountDelegate

		err_msg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in loanAccountsIds:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				customer.loanAccounts.remove(loanAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : LoanAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addPaymentCards( self, customer_id, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to add elements " + str(paymentCardsIds) + " for PaymentCards on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in paymentCardsIds:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				customer.paymentCards.add(paymentCard)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(err_msg + " : PaymentCard does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removePaymentCards( self, customer_id, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

		err_msg = "Failed to remove elements " + str(paymentCardsIds) + " for PaymentCards on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in paymentCardsIds:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				customer.paymentCards.remove(paymentCard)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(err_msg + " : PaymentCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addExternalAccounts( self, customer_id, externalAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to add elements " + str(externalAccountsIds) + " for ExternalAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in externalAccountsIds:
				# read the ExternalAccount		
				externalAccount = ExternalAccountDelegate().get(id).first();	
				# add the ExternalAccount
				customer.externalAccounts.add(externalAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : ExternalAccount does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeExternalAccounts( self, customer_id, externalAccountsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		err_msg = "Failed to remove elements " + str(externalAccountsIds) + " for ExternalAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in externalAccountsIds:
				# read the ExternalAccount		
				externalAccount = ExternalAccountDelegate().get(id).first();	
				# add the ExternalAccount
				customer.externalAccounts.remove(externalAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(err_msg + " : ExternalAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addFundsTransfers( self, customer_id, fundsTransfersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

		err_msg = "Failed to add elements " + str(fundsTransfersIds) + " for FundsTransfers on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in fundsTransfersIds:
				# read the FundsTransfer		
				fundsTransfer = FundsTransferDelegate().get(id).first();	
				# add the FundsTransfer
				customer.fundsTransfers.add(fundsTransfer)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeFundsTransfers( self, customer_id, fundsTransfersIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.FundsTransferDelegate import FundsTransferDelegate

		err_msg = "Failed to remove elements " + str(fundsTransfersIds) + " for FundsTransfers on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in fundsTransfersIds:
				# read the FundsTransfer		
				fundsTransfer = FundsTransferDelegate().get(id).first();	
				# add the FundsTransfer
				customer.fundsTransfers.remove(fundsTransfer)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(err_msg + " : FundsTransfer does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addDisputes( self, customer_id, disputesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

		err_msg = "Failed to add elements " + str(disputesIds) + " for Disputes on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in disputesIds:
				# read the Dispute		
				dispute = DisputeDelegate().get(id).first();	
				# add the Dispute
				customer.disputes.add(dispute)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(err_msg + " : Dispute does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeDisputes( self, customer_id, disputesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.DisputeDelegate import DisputeDelegate

		err_msg = "Failed to remove elements " + str(disputesIds) + " for Disputes on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in disputesIds:
				# read the Dispute		
				dispute = DisputeDelegate().get(id).first();	
				# add the Dispute
				customer.disputes.remove(dispute)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(err_msg + " : Dispute does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addKycProfiles( self, customer_id, kycProfilesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

		err_msg = "Failed to add elements " + str(kycProfilesIds) + " for KycProfiles on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in kycProfilesIds:
				# read the KycProfile		
				kycProfile = KycProfileDelegate().get(id).first();	
				# add the KycProfile
				customer.kycProfiles.add(kycProfile)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(err_msg + " : KycProfile does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeKycProfiles( self, customer_id, kycProfilesIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

		err_msg = "Failed to remove elements " + str(kycProfilesIds) + " for KycProfiles on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in kycProfilesIds:
				# read the KycProfile		
				kycProfile = KycProfileDelegate().get(id).first();	
				# add the KycProfile
				customer.kycProfiles.remove(kycProfile)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(err_msg + " : KycProfile does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
	def addConsents( self, customer_id, consentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

		err_msg = "Failed to add elements " + str(consentsIds) + " for Consents on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in consentsIds:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				customer.consents.add(consent)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(err_msg + " : Consent does not exist.")
		except Exception:
			raise ProcessingError(err_msg) 
		
	def removeConsents( self, customer_id, consentsIds ):
		# lazy importing avoids circular dependencies
		from bankingOnDjango.delegates.ConsentDelegate import ConsentDelegate

		err_msg = "Failed to remove elements " + str(consentsIds) + " for Consents on Customer"

		try:
			# get the Customer
			customer = self.get( customer_id ).first()
				
			# iterate over ids
			for id in consentsIds:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				customer.consents.remove(consent)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customer_id );
		except Customer.DoesNotExist:
			raise ProcessingError(err_msg + " : Customer with id " + str(customer_id) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(err_msg + " : Consent does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(err_msg) 
		
