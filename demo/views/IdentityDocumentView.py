import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.IdentityDocumentDelegate import IdentityDocumentDelegate

 #======================================================================
# 
# Encapsulates data for View IdentityDocument
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class IdentityDocumentView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the IdentityDocument index.")

def get(request, identityDocumentId ):
	delegate = IdentityDocumentDelegate()
	responseData = delegate.get( identityDocumentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	identityDocument = json.loads(request.body)
	delegate = IdentityDocumentDelegate()
	responseData = delegate.createFromJson( identityDocument )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	identityDocument = json.loads(request.body)
	delegate = IdentityDocumentDelegate()
	responseData = delegate.save( identityDocument )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, identityDocumentId ):
	delegate = IdentityDocumentDelegate()
	responseData = delegate.delete( identityDocumentId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = IdentityDocumentDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignKycProfile( request, identityDocumentId, KycProfileId ):
	delegate = IdentityDocumentDelegate()
	responseData = delegate.saveKycProfile( identityDocumentId, KycProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignKycProfile( request, identityDocumentId ):
	delegate = IdentityDocumentDelegate()
	responseData = delegate.deleteKycProfile( identityDocumentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

