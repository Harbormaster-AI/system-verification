import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ExternalAccountDelegate import ExternalAccountDelegate

 #======================================================================
# 
# Encapsulates data for View ExternalAccount
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExternalAccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ExternalAccount index.")

def get(request, externalAccountId ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.get( externalAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	externalAccount = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	responseData = delegate.createFromJson( externalAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	externalAccount = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	responseData = delegate.save( externalAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, externalAccountId ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.delete( externalAccountId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ExternalAccountDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCustomer( request, externalAccountId, CustomerId ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.saveCustomer( externalAccountId, CustomerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCustomer( request, externalAccountId ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.deleteCustomer( externalAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addTransactions( request, externalAccountId, TransactionsIds ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.addTransactions( externalAccountId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeTransactions( request, externalAccountId, TransactionsIds ):
	delegate = ExternalAccountDelegate()
	responseData = delegate.removeTransactions( externalAccountId, TransactionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

