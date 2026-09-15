import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.BuildingDelegate import BuildingDelegate

 #======================================================================
# 
# Encapsulates data for View Building
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BuildingView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Building index.")

def get(request, buildingId ):
	delegate = BuildingDelegate()
	responseData = delegate.get( buildingId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	building = json.loads(request.body)
	delegate = BuildingDelegate()
	responseData = delegate.createFromJson( building )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	building = json.loads(request.body)
	delegate = BuildingDelegate()
	responseData = delegate.save( building )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, buildingId ):
	delegate = BuildingDelegate()
	responseData = delegate.delete( buildingId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = BuildingDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignSite( request, buildingId, SiteId ):
	delegate = BuildingDelegate()
	responseData = delegate.saveSite( buildingId, SiteId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSite( request, buildingId ):
	delegate = BuildingDelegate()
	responseData = delegate.deleteSite( buildingId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFloors( request, buildingId, FloorsIds ):
	delegate = BuildingDelegate()
	responseData = delegate.addFloors( buildingId, FloorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFloors( request, buildingId, FloorsIds ):
	delegate = BuildingDelegate()
	responseData = delegate.removeFloors( buildingId, FloorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

