import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.RiskAssessmentDelegate import RiskAssessmentDelegate

 #======================================================================
# 
# Encapsulates data for View RiskAssessment
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RiskAssessmentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the RiskAssessment index.")

def get(request, riskAssessmentId ):
	delegate = RiskAssessmentDelegate()
	responseData = delegate.get( riskAssessmentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	riskAssessment = json.loads(request.body)
	delegate = RiskAssessmentDelegate()
	responseData = delegate.createFromJson( riskAssessment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	riskAssessment = json.loads(request.body)
	delegate = RiskAssessmentDelegate()
	responseData = delegate.save( riskAssessment )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, riskAssessmentId ):
	delegate = RiskAssessmentDelegate()
	responseData = delegate.delete( riskAssessmentId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = RiskAssessmentDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignKycProfile( request, riskAssessmentId, KycProfileId ):
	delegate = RiskAssessmentDelegate()
	responseData = delegate.saveKycProfile( riskAssessmentId, KycProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignKycProfile( request, riskAssessmentId ):
	delegate = RiskAssessmentDelegate()
	responseData = delegate.deleteKycProfile( riskAssessmentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

