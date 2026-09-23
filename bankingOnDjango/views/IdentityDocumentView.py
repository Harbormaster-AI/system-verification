import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

 #======================================================================
# 
# Encapsulates data for View IdentityDocument
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class IdentityDocumentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the IdentityDocument index.")


def get(request):
    requestData = json.loads(request.body)
    identityDocumentId = requestData["id"]
    delegate = IdentityDocumentDelegate()
    responseData = delegate.get(identityDocumentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	identityDocument = json.loads(request.body)
	delegate = IdentityDocumentDelegate()
	responseData = delegate.createFromJson( identityDocument )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	identityDocument = json.loads(request.body)
	delegate = IdentityDocumentDelegate()
	responseData = delegate.save( identityDocument )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    identityDocumentId = requestData["id"]
    delegate = IdentityDocumentDelegate()
    responseData = delegate.delete(identityDocumentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = IdentityDocumentDelegate()
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
    delegate = IdentityDocumentDelegate()
    responseData = delegate.assignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignKycProfile(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = IdentityDocumentDelegate()
    responseData = delegate.unassignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
