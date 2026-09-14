import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from demo.delegates.BranchDelegate import BranchDelegate

 #======================================================================
# 
# Encapsulates data for View Branch
#
# @author your_name_here
#
#======================================================================

#======================================================================
# Class BranchView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Branch index.")

def get(request, branchId ):
	delegate = BranchDelegate()
	responseData = delegate.get( branchId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	branch = json.loads(request.body)
	delegate = BranchDelegate()
	responseData = delegate.createFromJson( branch )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	branch = json.loads(request.body)
	delegate = BranchDelegate()
	responseData = delegate.save( branch )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, branchId ):
	delegate = BranchDelegate()
	responseData = delegate.delete( branchId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = BranchDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignBank( request, branchId, BankId ):
	delegate = BranchDelegate()
	responseData = delegate.saveBank( branchId, BankId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBank( request, branchId ):
	delegate = BranchDelegate()
	responseData = delegate.deleteBank( branchId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAccounts( request, branchId, AccountsIds ):
	delegate = BranchDelegate()
	responseData = delegate.addAccounts( branchId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAccounts( request, branchId, AccountsIds ):
	delegate = BranchDelegate()
	responseData = delegate.removeAccounts( branchId, AccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addLoanAccounts( request, branchId, LoanAccountsIds ):
	delegate = BranchDelegate()
	responseData = delegate.addLoanAccounts( branchId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeLoanAccounts( request, branchId, LoanAccountsIds ):
	delegate = BranchDelegate()
	responseData = delegate.removeLoanAccounts( branchId, LoanAccountsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAtms( request, branchId, AtmsIds ):
	delegate = BranchDelegate()
	responseData = delegate.addAtms( branchId, AtmsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAtms( request, branchId, AtmsIds ):
	delegate = BranchDelegate()
	responseData = delegate.removeAtms( branchId, AtmsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

