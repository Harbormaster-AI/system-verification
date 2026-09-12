import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.StandingInstructionDelegate import StandingInstructionDelegate

 #======================================================================
# 
# Encapsulates data for View StandingInstruction
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class StandingInstructionView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the StandingInstruction index.")

def get(request, standingInstructionId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.get( standingInstructionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	standingInstruction = json.loads(request.body)
	delegate = StandingInstructionDelegate()
	responseData = delegate.createFromJson( standingInstruction )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	standingInstruction = json.loads(request.body)
	delegate = StandingInstructionDelegate()
	responseData = delegate.save( standingInstruction )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, standingInstructionId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.delete( standingInstructionId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = StandingInstructionDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAccount( request, standingInstructionId, AccountId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.saveAccount( standingInstructionId, AccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccount( request, standingInstructionId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.deleteAccount( standingInstructionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBeneficiary( request, standingInstructionId, BeneficiaryId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.saveBeneficiary( standingInstructionId, BeneficiaryId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBeneficiary( request, standingInstructionId ):
	delegate = StandingInstructionDelegate()
	responseData = delegate.deleteBeneficiary( standingInstructionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

