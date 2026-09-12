import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.KycProfileDelegate import KycProfileDelegate

 #======================================================================
# 
# Encapsulates data for View KycProfile
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class KycProfileView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the KycProfile index.")

def get(request, kycProfileId ):
	delegate = KycProfileDelegate()
	responseData = delegate.get( kycProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	kycProfile = json.loads(request.body)
	delegate = KycProfileDelegate()
	responseData = delegate.createFromJson( kycProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	kycProfile = json.loads(request.body)
	delegate = KycProfileDelegate()
	responseData = delegate.save( kycProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, kycProfileId ):
	delegate = KycProfileDelegate()
	responseData = delegate.delete( kycProfileId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = KycProfileDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCustomer( request, kycProfileId, CustomerId ):
	delegate = KycProfileDelegate()
	responseData = delegate.saveCustomer( kycProfileId, CustomerId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCustomer( request, kycProfileId ):
	delegate = KycProfileDelegate()
	responseData = delegate.deleteCustomer( kycProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addIdentityDocuments( request, kycProfileId, IdentityDocumentsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.addIdentityDocuments( kycProfileId, IdentityDocumentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeIdentityDocuments( request, kycProfileId, IdentityDocumentsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.removeIdentityDocuments( kycProfileId, IdentityDocumentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addRiskAssessments( request, kycProfileId, RiskAssessmentsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.addRiskAssessments( kycProfileId, RiskAssessmentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeRiskAssessments( request, kycProfileId, RiskAssessmentsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.removeRiskAssessments( kycProfileId, RiskAssessmentsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addScreenings( request, kycProfileId, ScreeningsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.addScreenings( kycProfileId, ScreeningsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeScreenings( request, kycProfileId, ScreeningsIds ):
	delegate = KycProfileDelegate()
	responseData = delegate.removeScreenings( kycProfileId, ScreeningsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

