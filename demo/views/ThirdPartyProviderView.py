import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

 #======================================================================
# 
# Encapsulates data for View ThirdPartyProvider
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ThirdPartyProviderView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ThirdPartyProvider index.")

def get(request, thirdPartyProviderId ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.get( thirdPartyProviderId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	thirdPartyProvider = json.loads(request.body)
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.createFromJson( thirdPartyProvider )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	thirdPartyProvider = json.loads(request.body)
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.save( thirdPartyProvider )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, thirdPartyProviderId ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.delete( thirdPartyProviderId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, thirdPartyProviderId, BankId ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.saveBank( thirdPartyProviderId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, thirdPartyProviderId ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.deleteBank( thirdPartyProviderId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addConsents( request, thirdPartyProviderId, ConsentsIds ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.addConsents( thirdPartyProviderId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeConsents( request, thirdPartyProviderId, ConsentsIds ):
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.removeConsents( thirdPartyProviderId, ConsentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

