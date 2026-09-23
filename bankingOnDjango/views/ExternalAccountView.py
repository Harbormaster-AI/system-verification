import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ExternalAccountDelegate import ExternalAccountDelegate

 #======================================================================
# 
# Encapsulates data for View ExternalAccount
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ExternalAccountView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ExternalAccount index.")


def get(request):
    requestData = json.loads(request.body)
    externalAccountId = requestData["id"]
    delegate = ExternalAccountDelegate()
    responseData = delegate.get(externalAccountId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	externalAccount = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	responseData = delegate.createFromJson( externalAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	externalAccount = json.loads(request.body)
	delegate = ExternalAccountDelegate()
	responseData = delegate.save( externalAccount )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    externalAccountId = requestData["id"]
    delegate = ExternalAccountDelegate()
    responseData = delegate.delete(externalAccountId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = ExternalAccountDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignCustomer(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ExternalAccountDelegate()
    responseData = delegate.assignCustomer(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignCustomer(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ExternalAccountDelegate()
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
    delegate = ExternalAccountDelegate()
    responseData = delegate.addTransactions(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeTransactions(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = ExternalAccountDelegate()
    responseData = delegate.removeTransactions(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


