import json

from django.core import serializers
from django.http import HttpResponse

from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

# ======================================================================
#
# Encapsulates data for View Branch
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class BranchView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the Branch index.")


def get(request):
    request_data = json.loads(request.body)
    branch_id = request_data["id"]
    delegate = BranchDelegate()
    request_data = delegate.get(branch_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    branch = json.loads(request.body)
    delegate = BranchDelegate()
    request_data = delegate.createFromJson(branch)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    branch = json.loads(request.body)
    delegate = BranchDelegate()
    request_data = delegate.save(branch)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    branch_id = request_data["id"]
    delegate = BranchDelegate()
    request_data = delegate.delete(branch_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = BranchDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = BranchDelegate()
    request_data = delegate.assignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = BranchDelegate()
    request_data = delegate.unassignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.addAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.removeAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addLoanAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.addLoanAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeLoanAccounts(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.removeLoanAccounts(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def addAtms(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.addAtms(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeAtms(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = BranchDelegate()
    request_data = delegate.removeAtms(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
