from django.urls import path


from bankingOnDjango.views import AccountStatementView

urlpatterns = [
    path("", AccountStatementView.index, name="index"),
    path("create", AccountStatementView.create, name="create"),
    path("update", AccountStatementView.update, name="update"),
    path("get", AccountStatementView.get, name="get"),
    path("getAll", AccountStatementView.getAll, name="getAll"),
    path("delete", AccountStatementView.delete, name="delete"),
    path("assignAccount", AccountStatementView.assignAccount, name="assignAccount"),
    path(
        "unassignAccount", AccountStatementView.unassignAccount, name="unassignAccount"
    ),
]
