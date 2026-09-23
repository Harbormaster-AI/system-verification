import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.ThirdPartyProviderDelegate import ThirdPartyProviderDelegate

 #======================================================================
# 
# Encapsulates data for View ThirdPartyProvider
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ThirdPartyProviderView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ThirdPartyProvider index.")


def get(request):
    requestData = json.loads(request.body)
    thirdPartyProviderId = requestData["id"]
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.get(thirdPartyProviderId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	thirdPartyProvider = json.loads(request.body)
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.createFromJson( thirdPartyProvider )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	thirdPartyProvider = json.loads(request.body)
	delegate = ThirdPartyProviderDelegate()
	responseData = delegate.save( thirdPartyProvider )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    thirdPartyProviderId = requestData["id"]
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.delete(thirdPartyProviderId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = ThirdPartyProviderDelegate()
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
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.assignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.unassignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addConsents(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.addConsents(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeConsents(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = ThirdPartyProviderDelegate()
    responseData = delegate.removeConsents(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


