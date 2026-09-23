import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ScreeningResultDelegate import ScreeningResultDelegate

 #======================================================================
# 
# Encapsulates data for View ScreeningResult
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ScreeningResultView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ScreeningResult index.")


def get(request):
    requestData = json.loads(request.body)
    screeningResultId = requestData["id"]
    delegate = ScreeningResultDelegate()
    responseData = delegate.get(screeningResultId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	screeningResult = json.loads(request.body)
	delegate = ScreeningResultDelegate()
	responseData = delegate.createFromJson( screeningResult )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	screeningResult = json.loads(request.body)
	delegate = ScreeningResultDelegate()
	responseData = delegate.save( screeningResult )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    screeningResultId = requestData["id"]
    delegate = ScreeningResultDelegate()
    responseData = delegate.delete(screeningResultId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = ScreeningResultDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignKycProfile(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ScreeningResultDelegate()
    responseData = delegate.assignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignKycProfile(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ScreeningResultDelegate()
    responseData = delegate.unassignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
