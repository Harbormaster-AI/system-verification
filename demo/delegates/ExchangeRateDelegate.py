from django.core import exceptions
from django.core import serializers
from django.db import models
from django.db import utils

from demo.models.ExchangeRate import ExchangeRate
from demo.models.Bank import Bank
from demo.models.FXTrade import FXTrade
from demo.exceptions import Exceptions

 #======================================================================
# 
# Encapsulates data for model ExchangeRate
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExchangeRateDelegate Declaration
#======================================================================
class ExchangeRateDelegate :

#======================================================================
# Function Declarations
#======================================================================

	def get(self, exchangeRateId ):
		try:	
			exchangeRate = ExchangeRate.objects.filter(id=exchangeRateId)
			return exchangeRate.first();
		except ExchangeRate.DoesNotExist:
			raise ProcessingError("ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 

	def createFromJson(self, exchangeRate):
		for model in serializers.deserialize("json", exchangeRate):
			model.save()
			return model;

	def create(self, exchangeRate):
		exchangeRate.save()
		return exchangeRate;

	def saveFromJson(self, exchangeRate):
		for model in serializers.deserialize("json", exchangeRate):
			model.save()
			return exchangeRate;
	
	def save(self, exchangeRate):
		exchangeRate.save()
		return exchangeRate;
	
	def delete(self, exchangeRateId ):
		errMsg = "Failed to delete ExchangeRate from db using id " + str(exchangeRateId)
		
		try:
			exchangeRate = ExchangeRate.objects.get(id=exchangeRateId)
			exchangeRate.delete()
			return True
		except ExchangeRate.DoesNotExist:
			raise ProcessingError("ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except utils.DatabaseError:
			raise StorageReadError()
		except Exception:
			raise GeneralError(errMsg) 
	
	def getAll(self):
		try:
			all = ExchangeRate.objects.all()
			return all;
		except utils.DatabaseError:
			raise StorageReadError("Failed to get all ExchangeRate from db")
		except Exception:
			return None;
		
	def assignBank( self, exchangeRateId, bankId ):
		# lazy importing avoids circular dependencies
		from demo.delegates.BankDelegate import BankDelegate

		errMsg = "Failed to assign element " + str(bankId) + " for Bank on ExchangeRate"

		try:
			# get the ExchangeRate from db
			exchangeRate = self.get( exchangeRateId ).first()	
			
			# get the Bank from db
			bank = BankDelegate().get(bankId).first();
			
			# assign the Bank		
			exchangeRate.bank = bank
			
			#save it
			exchangeRate.save()

			# reload and return the appropriate version					
			return self.get( exchangeRateId );
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except Bank.DoesNotExist:
			raise ProcessingError(errMsg + " : Bank with id " + str(bankId) + " does not exist.")
		except Exception:
			return None;
				
	def unassignBank( self, exchangeRateId ):
		errMsg = "Failed to unassign element " + str(bankId) + " for Bank on ExchangeRate"

		try:
			# get the ExchangeRate from db
			exchangeRate = self.get( exchangeRateId ).first()	
			
			# assign to None for unassignment
			exchangeRate.bank = None			

			#save it
			exchangeRate.save()

			# reload and return the appropriate version					
			return self.get( exchangeRateId );
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except Exception:
			return None;
		
	def addFxTrades( self, exchangeRateId, fxTradesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FXTradeDelegate import FXTradeDelegate

		errMsg = "Failed to add elements " + str(fxTradesIds) + " for FxTrades on ExchangeRate"

		try:
			# get the ExchangeRate
			exchangeRate = self.get( exchangeRateId ).first()
				
			# split on a comma with no spaces
			idList = fxTradesIds.split(',')

			
			# iterate over ids
			for id in idList:
				# read the FXTrade		
				fXTrade = FXTradeDelegate().get(id).first();	
				# add the FXTrade
				exchangeRate.fxTrades.add(fXTrade)
				
			# save it		
			exchangeRate.save()
			
			# reload and return the appropriate version
			return self.get( exchangeRateId );
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade does not exist.")
		except Exception:
			raise ProcessingError(errMsg) 
		
	def removeFxTrades( self, exchangeRateId, fxTradesIds ):
		# lazy importing avoids circular dependencies
		from demo.delegates.FXTradeDelegate import FXTradeDelegate

		errMsg = "Failed to remove elements " + str(fxTradesIds) + " for FxTrades on ExchangeRate"

		try:
			# get the ExchangeRate
			exchangeRate = self.get( exchangeRateId ).first()
				
			# split on a comma with no spaces
			idList = fxTradesIds.split(',')
			
			# iterate over ids
			for id in idList:
				# read the FXTrade		
				fXTrade = FXTradeDelegate().get(id).first();	
				# add the FXTrade
				exchangeRate.fxTrades.remove(fXTrade)
				
			# save it		
			exchangeRate.save()
			
			# reload and return the appropriate version
			return self.get( exchangeRateId );
		except ExchangeRate.DoesNotExist:
			raise ProcessingError(errMsg + " : ExchangeRate with id " + str(exchangeRateId) + " does not exist.")
		except FXTrade.DoesNotExist:
			raise ProcessingError(errMsg + " : FXTrade does not exist.")
		except utils.DatabaseError:
			raise StorageWriteError()
		except Exception:
			raise GeneralError(errMsg) 
		
