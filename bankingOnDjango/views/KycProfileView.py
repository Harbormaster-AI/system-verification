import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.KycProfileDelegate import KycProfileDelegate

 #======================================================================
# 
# Encapsulates data for View KycProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class KycProfileView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the KycProfile index.")


def get(request):
    requestData = json.loads(request.body)
    kycProfileId = requestData["id"]
    delegate = KycProfileDelegate()
    responseData = delegate.get(kycProfileId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	kycProfile = json.loads(request.body)
	delegate = KycProfileDelegate()
	responseData = delegate.createFromJson( kycProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	kycProfile = json.loads(request.body)
	delegate = KycProfileDelegate()
	responseData = delegate.save( kycProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    kycProfileId = requestData["id"]
    delegate = KycProfileDelegate()
    responseData = delegate.delete(kycProfileId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = KycProfileDelegate()
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
    delegate = KycProfileDelegate()
    responseData = delegate.assignCustomer(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignCustomer(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = KycProfileDelegate()
    responseData = delegate.unassignCustomer(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addIdentityDocuments(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.addIdentityDocuments(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeIdentityDocuments(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.removeIdentityDocuments(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addRiskAssessments(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.addRiskAssessments(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeRiskAssessments(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.removeRiskAssessments(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addScreenings(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.addScreenings(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeScreenings(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = KycProfileDelegate()
    responseData = delegate.removeScreenings(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


