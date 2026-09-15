import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TwinChangeEventDelegate import TwinChangeEventDelegate

 #======================================================================
# 
# Encapsulates data for View TwinChangeEvent
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinChangeEventView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the TwinChangeEvent index.")

def get(request, twinChangeEventId ):
	delegate = TwinChangeEventDelegate()
	responseData = delegate.get( twinChangeEventId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	twinChangeEvent = json.loads(request.body)
	delegate = TwinChangeEventDelegate()
	responseData = delegate.createFromJson( twinChangeEvent )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	twinChangeEvent = json.loads(request.body)
	delegate = TwinChangeEventDelegate()
	responseData = delegate.save( twinChangeEvent )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, twinChangeEventId ):
	delegate = TwinChangeEventDelegate()
	responseData = delegate.delete( twinChangeEventId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TwinChangeEventDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTwin( request, twinChangeEventId, TwinId ):
	delegate = TwinChangeEventDelegate()
	responseData = delegate.saveTwin( twinChangeEventId, TwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTwin( request, twinChangeEventId ):
	delegate = TwinChangeEventDelegate()
	responseData = delegate.deleteTwin( twinChangeEventId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

