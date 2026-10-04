from django.urls import path


from bankingOnDjango.views import ConsentView

urlpatterns = [
    path("", ConsentView.index, name="index"),
    path("create", ConsentView.create, name="create"),
    path("update", ConsentView.update, name="update"),
    path("get", ConsentView.get, name="get"),
    path("getAll", ConsentView.getAll, name="getAll"),
    path("delete", ConsentView.delete, name="delete"),
    path("assignCustomer", ConsentView.assignCustomer, name="assignCustomer"),
    path("unassignCustomer", ConsentView.unassignCustomer, name="unassignCustomer"),
    path("assignBank", ConsentView.assignBank, name="assignBank"),
    path("unassignBank", ConsentView.unassignBank, name="unassignBank"),
    path(
        "assignThirdPartyProvider",
        ConsentView.assignThirdPartyProvider,
        name="assignThirdPartyProvider",
    ),
    path(
        "unassignThirdPartyProvider",
        ConsentView.unassignThirdPartyProvider,
        name="unassignThirdPartyProvider",
    ),
    path(
        "addToAuthorizedAccounts",
        ConsentView.addAuthorizedAccounts,
        name="addAuthorizedAccounts",
    ),
    path(
        "removeFromAuthorizedAccounts",
        ConsentView.removeAuthorizedAccounts,
        name="removeAuthorizedAccounts",
    ),
]
