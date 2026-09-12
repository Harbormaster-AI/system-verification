import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ConsentDelegate import ConsentDelegate

 #======================================================================
# 
# Encapsulates data for View Consent
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ConsentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Consent index.")

def get(request, consentId ):
	delegate = ConsentDelegate()
	responseData = delegate.get( consentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	consent = json.loads(request.body)
	delegate = ConsentDelegate()
	responseData = delegate.createFromJson( consent )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	consent = json.loads(request.body)
	delegate = ConsentDelegate()
	responseData = delegate.save( consent )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, consentId ):
	delegate = ConsentDelegate()
	responseData = delegate.delete( consentId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ConsentDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCustomer( request, consentId, CustomerId ):
	delegate = ConsentDelegate()
	responseData = delegate.saveCustomer( consentId, CustomerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCustomer( request, consentId ):
	delegate = ConsentDelegate()
	responseData = delegate.deleteCustomer( consentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, consentId, BankId ):
	delegate = ConsentDelegate()
	responseData = delegate.saveBank( consentId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, consentId ):
	delegate = ConsentDelegate()
	responseData = delegate.deleteBank( consentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignThirdPartyProvider( request, consentId, ThirdPartyProviderId ):
	delegate = ConsentDelegate()
	responseData = delegate.saveThirdPartyProvider( consentId, ThirdPartyProviderId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignThirdPartyProvider( request, consentId ):
	delegate = ConsentDelegate()
	responseData = delegate.deleteThirdPartyProvider( consentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAuthorizedAccounts( request, consentId, AuthorizedAccountsIds ):
	delegate = ConsentDelegate()
	responseData = delegate.addAuthorizedAccounts( consentId, AuthorizedAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAuthorizedAccounts( request, consentId, AuthorizedAccountsIds ):
	delegate = ConsentDelegate()
	responseData = delegate.removeAuthorizedAccounts( consentId, AuthorizedAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

