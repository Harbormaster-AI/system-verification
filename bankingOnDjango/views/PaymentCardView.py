import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

 #======================================================================
# 
# Encapsulates data for View PaymentCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class PaymentCardView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the PaymentCard index.")


def get(request):
    requestData = json.loads(request.body)
    paymentCardId = requestData["id"]
    delegate = PaymentCardDelegate()
    responseData = delegate.get(paymentCardId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	paymentCard = json.loads(request.body)
	delegate = PaymentCardDelegate()
	responseData = delegate.createFromJson( paymentCard )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	paymentCard = json.loads(request.body)
	delegate = PaymentCardDelegate()
	responseData = delegate.save( paymentCard )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    paymentCardId = requestData["id"]
    delegate = PaymentCardDelegate()
    responseData = delegate.delete(paymentCardId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = PaymentCardDelegate()
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
    delegate = PaymentCardDelegate()
    responseData = delegate.assignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = PaymentCardDelegate()
    responseData = delegate.unassignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")
def assignAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = PaymentCardDelegate()
    responseData = delegate.assignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = PaymentCardDelegate()
    responseData = delegate.unassignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")
def assignCustomer(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = PaymentCardDelegate()
    responseData = delegate.assignCustomer(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignCustomer(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = PaymentCardDelegate()
    responseData = delegate.unassignCustomer(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addTransactions(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = PaymentCardDelegate()
    responseData = delegate.addTransactions(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeTransactions(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = PaymentCardDelegate()
    responseData = delegate.removeTransactions(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


