import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.TransactionDelegate import TransactionDelegate

# ======================================================================
#
# Encapsulates data for View Transaction
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class TransactionView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the Transaction index.")


def get(request):
    request_data = json.loads(request.body)
    transaction_id = request_data["id"]
    delegate = TransactionDelegate()
    request_data = delegate.get(transaction_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    transaction = json.loads(request.body)
    delegate = TransactionDelegate()
    request_data = delegate.createFromJson(transaction)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    transaction = json.loads(request.body)
    delegate = TransactionDelegate()
    request_data = delegate.save(transaction)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    transaction_id = request_data["id"]
    delegate = TransactionDelegate()
    request_data = delegate.delete(transaction_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = TransactionDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignExternalCounterparty(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignExternalCounterparty(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignExternalCounterparty(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignExternalCounterparty(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignPaymentCard(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignPaymentCard(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignPaymentCard(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignPaymentCard(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignFundsTransfer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignFundsTransfer(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignFundsTransfer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignFundsTransfer(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignFxTrade(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignFxTrade(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignFxTrade(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignFxTrade(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignDispute(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.assignDispute(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignDispute(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = TransactionDelegate()
    request_data = delegate.unassignDispute(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
