import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.BankingProductDelegate import BankingProductDelegate

 #======================================================================
# 
# Encapsulates data for View BankingProduct
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankingProductView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the BankingProduct index.")


def get(request):
    requestData = json.loads(request.body)
    bankingProductId = requestData["id"]
    delegate = BankingProductDelegate()
    responseData = delegate.get(bankingProductId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	bankingProduct = json.loads(request.body)
	delegate = BankingProductDelegate()
	responseData = delegate.createFromJson( bankingProduct )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	bankingProduct = json.loads(request.body)
	delegate = BankingProductDelegate()
	responseData = delegate.save( bankingProduct )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    bankingProductId = requestData["id"]
    delegate = BankingProductDelegate()
    responseData = delegate.delete(bankingProductId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = BankingProductDelegate()
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
    delegate = BankingProductDelegate()
    responseData = delegate.assignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = BankingProductDelegate()
    responseData = delegate.unassignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.addAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.removeAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.addLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.removeLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addPaymentCards(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.addPaymentCards(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removePaymentCards(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankingProductDelegate()
    responseData = delegate.removePaymentCards(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


