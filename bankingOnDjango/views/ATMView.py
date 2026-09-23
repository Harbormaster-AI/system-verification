import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ATMDelegate import ATMDelegate

 #======================================================================
# 
# Encapsulates data for View ATM
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ATMView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ATM index.")


def get(request):
    requestData = json.loads(request.body)
    aTMId = requestData["id"]
    delegate = ATMDelegate()
    responseData = delegate.get(aTMId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	responseData = delegate.createFromJson( aTM )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	aTM = json.loads(request.body)
	delegate = ATMDelegate()
	responseData = delegate.save( aTM )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    aTMId = requestData["id"]
    delegate = ATMDelegate()
    responseData = delegate.delete(aTMId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = ATMDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignBranch(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ATMDelegate()
    responseData = delegate.assignBranch(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBranch(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ATMDelegate()
    responseData = delegate.unassignBranch(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
