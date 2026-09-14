import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.BankDelegate import BankDelegate

 #======================================================================
# 
# Encapsulates data for View Bank
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BankView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Bank index.")

def get(request, bankId ):
	delegate = BankDelegate()
	responseData = delegate.get( bankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	bank = json.loads(request.body)
	delegate = BankDelegate()
	responseData = delegate.createFromJson( bank )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	bank = json.loads(request.body)
	delegate = BankDelegate()
	responseData = delegate.save( bank )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, bankId ):
	delegate = BankDelegate()
	responseData = delegate.delete( bankId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = BankDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addBranches( request, bankId, BranchesIds ):
	delegate = BankDelegate()
	responseData = delegate.addBranches( bankId, BranchesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeBranches( request, bankId, BranchesIds ):
	delegate = BankDelegate()
	responseData = delegate.removeBranches( bankId, BranchesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addProducts( request, bankId, ProductsIds ):
	delegate = BankDelegate()
	responseData = delegate.addProducts( bankId, ProductsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeProducts( request, bankId, ProductsIds ):
	delegate = BankDelegate()
	responseData = delegate.removeProducts( bankId, ProductsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCustomers( request, bankId, CustomersIds ):
	delegate = BankDelegate()
	responseData = delegate.addCustomers( bankId, CustomersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCustomers( request, bankId, CustomersIds ):
	delegate = BankDelegate()
	responseData = delegate.removeCustomers( bankId, CustomersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAccounts( request, bankId, AccountsIds ):
	delegate = BankDelegate()
	responseData = delegate.addAccounts( bankId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAccounts( request, bankId, AccountsIds ):
	delegate = BankDelegate()
	responseData = delegate.removeAccounts( bankId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addPaymentCards( request, bankId, PaymentCardsIds ):
	delegate = BankDelegate()
	responseData = delegate.addPaymentCards( bankId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removePaymentCards( request, bankId, PaymentCardsIds ):
	delegate = BankDelegate()
	responseData = delegate.removePaymentCards( bankId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addLoanAccounts( request, bankId, LoanAccountsIds ):
	delegate = BankDelegate()
	responseData = delegate.addLoanAccounts( bankId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeLoanAccounts( request, bankId, LoanAccountsIds ):
	delegate = BankDelegate()
	responseData = delegate.removeLoanAccounts( bankId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addExchangeRates( request, bankId, ExchangeRatesIds ):
	delegate = BankDelegate()
	responseData = delegate.addExchangeRates( bankId, ExchangeRatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeExchangeRates( request, bankId, ExchangeRatesIds ):
	delegate = BankDelegate()
	responseData = delegate.removeExchangeRates( bankId, ExchangeRatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addConsents( request, bankId, ConsentsIds ):
	delegate = BankDelegate()
	responseData = delegate.addConsents( bankId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeConsents( request, bankId, ConsentsIds ):
	delegate = BankDelegate()
	responseData = delegate.removeConsents( bankId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addThirdPartyProviders( request, bankId, ThirdPartyProvidersIds ):
	delegate = BankDelegate()
	responseData = delegate.addThirdPartyProviders( bankId, ThirdPartyProvidersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeThirdPartyProviders( request, bankId, ThirdPartyProvidersIds ):
	delegate = BankDelegate()
	responseData = delegate.removeThirdPartyProviders( bankId, ThirdPartyProvidersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

