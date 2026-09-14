import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.FXTradeDelegate import FXTradeDelegate

 #======================================================================
# 
# Encapsulates data for View FXTrade
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class FXTradeView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FXTrade index.")

def get(request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.get( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	fXTrade = json.loads(request.body)
	delegate = FXTradeDelegate()
	responseData = delegate.createFromJson( fXTrade )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	fXTrade = json.loads(request.body)
	delegate = FXTradeDelegate()
	responseData = delegate.save( fXTrade )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.delete( fXTradeId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = FXTradeDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCustomer( request, fXTradeId, CustomerId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveCustomer( fXTradeId, CustomerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCustomer( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteCustomer( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, fXTradeId, BankId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveBank( fXTradeId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteBank( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignExchangeRate( request, fXTradeId, ExchangeRateId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveExchangeRate( fXTradeId, ExchangeRateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignExchangeRate( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteExchangeRate( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSourceAccount( request, fXTradeId, SourceAccountId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveSourceAccount( fXTradeId, SourceAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSourceAccount( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteSourceAccount( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDestinationAccount( request, fXTradeId, DestinationAccountId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveDestinationAccount( fXTradeId, DestinationAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDestinationAccount( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteDestinationAccount( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTransaction( request, fXTradeId, TransactionId ):
	delegate = FXTradeDelegate()
	responseData = delegate.saveTransaction( fXTradeId, TransactionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTransaction( request, fXTradeId ):
	delegate = FXTradeDelegate()
	responseData = delegate.deleteTransaction( fXTradeId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

