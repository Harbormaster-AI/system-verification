from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.Customer import Customer
from demo.models.Bank import Bank
from demo.models.Account import Account
from demo.models.LoanAccount import LoanAccount
from demo.models.PaymentCard import PaymentCard
from demo.models.ExternalAccount import ExternalAccount
from demo.models.FundsTransfer import FundsTransfer
from demo.models.Dispute import Dispute
from demo.models.KycProfile import KycProfile
from demo.models.Consent import Consent
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model Customer
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CustomerDelegate Declaration
#======================================================================
class CustomerDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, customerId ):
		try:	
			customer = Customer.objects.filter(id=customerId)
			return customer.first();
		except Customer.DoesNotExist:
			raise ProcessingError("Customer with id " + str(customerId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

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
	
	def delete(self, customerId ):
		errMsg = "Failed to delete Customer from db using id " + str(customerId)
		
		try:
			customer = Customer.objects.get(id=customerId)
			customer.delete()
			return True
		except Customer.DoesNotExist:
			raise ProcessingError("Customer with id " + str(customerId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = Customer.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all Customer from db")
		except Exception:
			return None;
		
	def assignBank( self, customerId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on Customer"

		try:
			# get the Customer from db
			customer = self.get( customerId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			customer.bank = bank
			
			#save it
			customer.save()

			# reload and return the appropriate version					
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, customerId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on Customer"

		try:
			# get the Customer from db
			customer = self.get( customerId ).first()	
			
			# assign to None for unassignment
			customer.bank = None			

			#save it
			customer.save()

			# reload and return the appropriate version					
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Exception:
			return None;
		
	def addAccounts( self, customerId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to add elements " + str(accountsIds) + " for Accounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				customer.accounts.add(account)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeAccounts( self, customerId, accountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.AccountDelegate import AccountDelegate

		errMsg = "Failed to remove elements " + str(accountsIds) + " for Accounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = accountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Account		
				account = AccountDelegate().get(id).first();	
				# add the Account
				customer.accounts.remove(account)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Account.DoesNotExist:
			raise ProcessingError(errMsg + " : Account does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addLoanAccounts( self, customerId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to add elements " + str(loanAccountsIds) + " for LoanAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				customer.loanAccounts.add(loanAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeLoanAccounts( self, customerId, loanAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.LoanAccountDelegate import LoanAccountDelegate

		errMsg = "Failed to remove elements " + str(loanAccountsIds) + " for LoanAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = loanAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the LoanAccount		
				loanAccount = LoanAccountDelegate().get(id).first();	
				# add the LoanAccount
				customer.loanAccounts.remove(loanAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except LoanAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : LoanAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addPaymentCards( self, customerId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to add elements " + str(paymentCardsIds) + " for PaymentCards on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				customer.paymentCards.add(paymentCard)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removePaymentCards( self, customerId, paymentCardsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.PaymentCardDelegate import PaymentCardDelegate

		errMsg = "Failed to remove elements " + str(paymentCardsIds) + " for PaymentCards on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = paymentCardsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the PaymentCard		
				paymentCard = PaymentCardDelegate().get(id).first();	
				# add the PaymentCard
				customer.paymentCards.remove(paymentCard)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except PaymentCard.DoesNotExist:
			raise ProcessingError(errMsg + " : PaymentCard does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addExternalAccounts( self, customerId, externalAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		errMsg = "Failed to add elements " + str(externalAccountsIds) + " for ExternalAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = externalAccountsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the ExternalAccount		
				externalAccount = ExternalAccountDelegate().get(id).first();	
				# add the ExternalAccount
				customer.externalAccounts.add(externalAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeExternalAccounts( self, customerId, externalAccountsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

		errMsg = "Failed to remove elements " + str(externalAccountsIds) + " for ExternalAccounts on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = externalAccountsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the ExternalAccount		
				externalAccount = ExternalAccountDelegate().get(id).first();	
				# add the ExternalAccount
				customer.externalAccounts.remove(externalAccount)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except ExternalAccount.DoesNotExist:
			raise ProcessingError(errMsg + " : ExternalAccount does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addFundsTransfers( self, customerId, fundsTransfersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FundsTransferDelegate import FundsTransferDelegate

		errMsg = "Failed to add elements " + str(fundsTransfersIds) + " for FundsTransfers on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = fundsTransfersIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FundsTransfer		
				fundsTransfer = FundsTransferDelegate().get(id).first();	
				# add the FundsTransfer
				customer.fundsTransfers.add(fundsTransfer)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFundsTransfers( self, customerId, fundsTransfersIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FundsTransferDelegate import FundsTransferDelegate

		errMsg = "Failed to remove elements " + str(fundsTransfersIds) + " for FundsTransfers on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = fundsTransfersIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FundsTransfer		
				fundsTransfer = FundsTransferDelegate().get(id).first();	
				# add the FundsTransfer
				customer.fundsTransfers.remove(fundsTransfer)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except FundsTransfer.DoesNotExist:
			raise ProcessingError(errMsg + " : FundsTransfer does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addDisputes( self, customerId, disputesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.DisputeDelegate import DisputeDelegate

		errMsg = "Failed to add elements " + str(disputesIds) + " for Disputes on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = disputesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Dispute		
				dispute = DisputeDelegate().get(id).first();	
				# add the Dispute
				customer.disputes.add(dispute)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeDisputes( self, customerId, disputesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.DisputeDelegate import DisputeDelegate

		errMsg = "Failed to remove elements " + str(disputesIds) + " for Disputes on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = disputesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Dispute		
				dispute = DisputeDelegate().get(id).first();	
				# add the Dispute
				customer.disputes.remove(dispute)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Dispute.DoesNotExist:
			raise ProcessingError(errMsg + " : Dispute does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addKycProfiles( self, customerId, kycProfilesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.KycProfileDelegate import KycProfileDelegate

		errMsg = "Failed to add elements " + str(kycProfilesIds) + " for KycProfiles on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = kycProfilesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the KycProfile		
				kycProfile = KycProfileDelegate().get(id).first();	
				# add the KycProfile
				customer.kycProfiles.add(kycProfile)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeKycProfiles( self, customerId, kycProfilesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.KycProfileDelegate import KycProfileDelegate

		errMsg = "Failed to remove elements " + str(kycProfilesIds) + " for KycProfiles on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = kycProfilesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the KycProfile		
				kycProfile = KycProfileDelegate().get(id).first();	
				# add the KycProfile
				customer.kycProfiles.remove(kycProfile)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except KycProfile.DoesNotExist:
			raise ProcessingError(errMsg + " : KycProfile does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
	def addConsents( self, customerId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to add elements " + str(consentsIds) + " for Consents on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				customer.consents.add(consent)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeConsents( self, customerId, consentsIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.ConsentDelegate import ConsentDelegate

		errMsg = "Failed to remove elements " + str(consentsIds) + " for Consents on Customer"

		try:
			# get the Customer
			customer = self.get( customerId ).first()
				
			# split on a comma with no spaces
			idList = consentsIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the Consent		
				consent = ConsentDelegate().get(id).first();	
				# add the Consent
				customer.consents.remove(consent)
				
			# save it		
			customer.save()
			
			# reload and return the appropriate version
			return self.get( customerId );
		except Customer.DoesNotExist:
			raise ProcessingError(errMsg + " : Customer with id " + str(customerId) + " does not exist.")
		except Consent.DoesNotExist:
			raise ProcessingError(errMsg + " : Consent does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
