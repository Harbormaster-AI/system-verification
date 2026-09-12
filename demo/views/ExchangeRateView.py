import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ExchangeRateDelegate import ExchangeRateDelegate

 #======================================================================
# 
# Encapsulates data for View ExchangeRate
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ExchangeRateView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ExchangeRate index.")

def get(request, exchangeRateId ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.get( exchangeRateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	exchangeRate = json.loads(request.body)
	delegate = ExchangeRateDelegate()
	responseData = delegate.createFromJson( exchangeRate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	exchangeRate = json.loads(request.body)
	delegate = ExchangeRateDelegate()
	responseData = delegate.save( exchangeRate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, exchangeRateId ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.delete( exchangeRateId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ExchangeRateDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, exchangeRateId, BankId ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.saveBank( exchangeRateId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, exchangeRateId ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.deleteBank( exchangeRateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFxTrades( request, exchangeRateId, FxTradesIds ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.addFxTrades( exchangeRateId, FxTradesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFxTrades( request, exchangeRateId, FxTradesIds ):
	delegate = ExchangeRateDelegate()
	responseData = delegate.removeFxTrades( exchangeRateId, FxTradesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

