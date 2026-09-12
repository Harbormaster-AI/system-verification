import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.ScreeningResultDelegate import ScreeningResultDelegate

 #======================================================================
# 
# Encapsulates data for View ScreeningResult
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class ScreeningResultView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ScreeningResult index.")

def get(request, screeningResultId ):
	delegate = ScreeningResultDelegate()
	responseData = delegate.get( screeningResultId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	screeningResult = json.loads(request.body)
	delegate = ScreeningResultDelegate()
	responseData = delegate.createFromJson( screeningResult )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	screeningResult = json.loads(request.body)
	delegate = ScreeningResultDelegate()
	responseData = delegate.save( screeningResult )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, screeningResultId ):
	delegate = ScreeningResultDelegate()
	responseData = delegate.delete( screeningResultId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ScreeningResultDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignKycProfile( request, screeningResultId, KycProfileId ):
	delegate = ScreeningResultDelegate()
	responseData = delegate.saveKycProfile( screeningResultId, KycProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignKycProfile( request, screeningResultId ):
	delegate = ScreeningResultDelegate()
	responseData = delegate.deleteKycProfile( screeningResultId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

