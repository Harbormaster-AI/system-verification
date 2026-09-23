import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.FeeChargeDelegate import FeeChargeDelegate

 #======================================================================
# 
# Encapsulates data for View FeeCharge
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FeeChargeView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FeeCharge index.")


def get(request):
    requestData = json.loads(request.body)
    feeChargeId = requestData["id"]
    delegate = FeeChargeDelegate()
    responseData = delegate.get(feeChargeId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	feeCharge = json.loads(request.body)
	delegate = FeeChargeDelegate()
	responseData = delegate.createFromJson( feeCharge )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	feeCharge = json.loads(request.body)
	delegate = FeeChargeDelegate()
	responseData = delegate.save( feeCharge )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    feeChargeId = requestData["id"]
    delegate = FeeChargeDelegate()
    responseData = delegate.delete(feeChargeId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = FeeChargeDelegate()
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
    delegate = FeeChargeDelegate()
    responseData = delegate.assignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = FeeChargeDelegate()
    responseData = delegate.unassignAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")
def assignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = FeeChargeDelegate()
    responseData = delegate.assignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = FeeChargeDelegate()
    responseData = delegate.unassignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
