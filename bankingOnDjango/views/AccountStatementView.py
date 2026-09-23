import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.AccountStatementDelegate import AccountStatementDelegate

 #======================================================================
# 
# Encapsulates data for View AccountStatement
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccountStatementView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the AccountStatement index.")


def get(request):
    requestData = json.loads(request.body)
    accountStatementId = requestData["id"]
    delegate = AccountStatementDelegate()
    responseData = delegate.get(accountStatementId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	responseData = delegate.createFromJson( accountStatement )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	accountStatement = json.loads(request.body)
	delegate = AccountStatementDelegate()
	responseData = delegate.save( accountStatement )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    accountStatementId = requestData["id"]
    delegate = AccountStatementDelegate()
    responseData = delegate.delete(accountStatementId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = AccountStatementDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = AccountStatementDelegate()
    responseData = delegate.assignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = AccountStatementDelegate()
    responseData = delegate.unassignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
