import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

 #======================================================================
# 
# Encapsulates data for View RepaymentSchedule
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class RepaymentScheduleView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the RepaymentSchedule index.")

def get(request, repaymentScheduleId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.get( repaymentScheduleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.createFromJson( repaymentSchedule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.save( repaymentSchedule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, repaymentScheduleId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.delete( repaymentScheduleId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignLoanAccount( request, repaymentScheduleId, LoanAccountId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.saveLoanAccount( repaymentScheduleId, LoanAccountId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignLoanAccount( request, repaymentScheduleId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.deleteLoanAccount( repaymentScheduleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignPayment( request, repaymentScheduleId, PaymentId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.savePayment( repaymentScheduleId, PaymentId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignPayment( request, repaymentScheduleId ):
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.deletePayment( repaymentScheduleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

