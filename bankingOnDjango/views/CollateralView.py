import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.CollateralDelegate import CollateralDelegate

 #======================================================================
# 
# Encapsulates data for View Collateral
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CollateralView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Collateral index.")


def get(request):
    requestData = json.loads(request.body)
    collateralId = requestData["id"]
    delegate = CollateralDelegate()
    responseData = delegate.get(collateralId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	collateral = json.loads(request.body)
	delegate = CollateralDelegate()
	responseData = delegate.createFromJson( collateral )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	collateral = json.loads(request.body)
	delegate = CollateralDelegate()
	responseData = delegate.save( collateral )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    collateralId = requestData["id"]
    delegate = CollateralDelegate()
    responseData = delegate.delete(collateralId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = CollateralDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = CollateralDelegate()
    responseData = delegate.assignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = CollateralDelegate()
    responseData = delegate.unassignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
