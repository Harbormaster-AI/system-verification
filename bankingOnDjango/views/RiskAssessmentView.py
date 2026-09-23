import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

 #======================================================================
# 
# Encapsulates data for View RiskAssessment
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RiskAssessmentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the RiskAssessment index.")


def get(request):
    requestData = json.loads(request.body)
    riskAssessmentId = requestData["id"]
    delegate = RiskAssessmentDelegate()
    responseData = delegate.get(riskAssessmentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	riskAssessment = json.loads(request.body)
	delegate = RiskAssessmentDelegate()
	responseData = delegate.createFromJson( riskAssessment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	riskAssessment = json.loads(request.body)
	delegate = RiskAssessmentDelegate()
	responseData = delegate.save( riskAssessment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    riskAssessmentId = requestData["id"]
    delegate = RiskAssessmentDelegate()
    responseData = delegate.delete(riskAssessmentId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = RiskAssessmentDelegate()
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
    delegate = RiskAssessmentDelegate()
    responseData = delegate.assignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignKycProfile(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = RiskAssessmentDelegate()
    responseData = delegate.unassignKycProfile(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
