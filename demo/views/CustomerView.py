import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.CustomerDelegate import CustomerDelegate

 #======================================================================
# 
# Encapsulates data for View Customer
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class CustomerView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Customer index.")

def get(request, customerId ):
	delegate = CustomerDelegate()
	responseData = delegate.get( customerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	customer = json.loads(request.body)
	delegate = CustomerDelegate()
	responseData = delegate.createFromJson( customer )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	customer = json.loads(request.body)
	delegate = CustomerDelegate()
	responseData = delegate.save( customer )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, customerId ):
	delegate = CustomerDelegate()
	responseData = delegate.delete( customerId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = CustomerDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, customerId, BankId ):
	delegate = CustomerDelegate()
	responseData = delegate.saveBank( customerId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, customerId ):
	delegate = CustomerDelegate()
	responseData = delegate.deleteBank( customerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAccounts( request, customerId, AccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addAccounts( customerId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAccounts( request, customerId, AccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeAccounts( customerId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addLoanAccounts( request, customerId, LoanAccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addLoanAccounts( customerId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeLoanAccounts( request, customerId, LoanAccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeLoanAccounts( customerId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addPaymentCards( request, customerId, PaymentCardsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addPaymentCards( customerId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removePaymentCards( request, customerId, PaymentCardsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removePaymentCards( customerId, PaymentCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addExternalAccounts( request, customerId, ExternalAccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addExternalAccounts( customerId, ExternalAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeExternalAccounts( request, customerId, ExternalAccountsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeExternalAccounts( customerId, ExternalAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFundsTransfers( request, customerId, FundsTransfersIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addFundsTransfers( customerId, FundsTransfersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFundsTransfers( request, customerId, FundsTransfersIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeFundsTransfers( customerId, FundsTransfersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDisputes( request, customerId, DisputesIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addDisputes( customerId, DisputesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDisputes( request, customerId, DisputesIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeDisputes( customerId, DisputesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addKycProfiles( request, customerId, KycProfilesIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addKycProfiles( customerId, KycProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeKycProfiles( request, customerId, KycProfilesIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeKycProfiles( customerId, KycProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addConsents( request, customerId, ConsentsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.addConsents( customerId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeConsents( request, customerId, ConsentsIds ):
	delegate = CustomerDelegate()
	responseData = delegate.removeConsents( customerId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

