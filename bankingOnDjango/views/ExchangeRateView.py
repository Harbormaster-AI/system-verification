import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ExchangeRateDelegate import ExchangeRateDelegate

 #======================================================================
# 
# Encapsulates data for View ExchangeRate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ExchangeRateView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ExchangeRate index.")


def get(request):
    requestData = json.loads(request.body)
    exchangeRateId = requestData["id"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.get(exchangeRateId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	exchangeRate = json.loads(request.body)
	delegate = ExchangeRateDelegate()
	responseData = delegate.createFromJson( exchangeRate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	exchangeRate = json.loads(request.body)
	delegate = ExchangeRateDelegate()
	responseData = delegate.save( exchangeRate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    exchangeRateId = requestData["id"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.delete(exchangeRateId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = ExchangeRateDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.assignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.unassignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addFxTrades(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.addFxTrades(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeFxTrades(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = ExchangeRateDelegate()
    responseData = delegate.removeFxTrades(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


