import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.BankDelegate import BankDelegate

 #======================================================================
# 
# Encapsulates data for View Bank
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BankView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Bank index.")


def get(request):
    requestData = json.loads(request.body)
    bankId = requestData["id"]
    delegate = BankDelegate()
    responseData = delegate.get(bankId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	bank = json.loads(request.body)
	delegate = BankDelegate()
	responseData = delegate.createFromJson( bank )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	bank = json.loads(request.body)
	delegate = BankDelegate()
	responseData = delegate.save( bank )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    bankId = requestData["id"]
    delegate = BankDelegate()
    responseData = delegate.delete(bankId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = BankDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addBranches(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addBranches(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeBranches(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeBranches(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addProducts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addProducts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeProducts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeProducts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addCustomers(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addCustomers(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeCustomers(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeCustomers(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addPaymentCards(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addPaymentCards(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removePaymentCards(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removePaymentCards(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addExchangeRates(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addExchangeRates(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeExchangeRates(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeExchangeRates(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addConsents(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addConsents(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeConsents(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeConsents(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addThirdPartyProviders(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.addThirdPartyProviders(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeThirdPartyProviders(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BankDelegate()
    responseData = delegate.removeThirdPartyProviders(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


