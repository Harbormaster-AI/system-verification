import json

from django.core import serializers

from django.http import HttpResponse

from bankingOnDjango.delegates.PaymentCardDelegate import PaymentCardDelegate

# ======================================================================
#
# Encapsulates data for View PaymentCard
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class PaymentCardView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the PaymentCard index.")


def get(request):
    request_data = json.loads(request.body)
    payment_card_id = request_data["id"]
    delegate = PaymentCardDelegate()
    request_data = delegate.get(payment_card_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    payment_card = json.loads(request.body)
    delegate = PaymentCardDelegate()
    request_data = delegate.createFromJson(payment_card)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    payment_card = json.loads(request.body)
    delegate = PaymentCardDelegate()
    request_data = delegate.save(payment_card)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    payment_card_id = request_data["id"]
    delegate = PaymentCardDelegate()
    request_data = delegate.delete(payment_card_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = PaymentCardDelegate()
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
    delegate = PaymentCardDelegate()
    request_data = delegate.assignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignBank(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = PaymentCardDelegate()
    request_data = delegate.unassignBank(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = PaymentCardDelegate()
    request_data = delegate.assignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = PaymentCardDelegate()
    request_data = delegate.unassignAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = PaymentCardDelegate()
    request_data = delegate.assignCustomer(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignCustomer(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = PaymentCardDelegate()
    request_data = delegate.unassignCustomer(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------


def addTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = PaymentCardDelegate()
    request_data = delegate.addTransactions(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def removeTransactions(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_ids = request_data["child_ids"]
    delegate = PaymentCardDelegate()
    request_data = delegate.removeTransactions(parent_id, child_ids)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")
