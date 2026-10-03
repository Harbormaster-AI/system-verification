from django.urls import path


from bankingOnDjango.views import ATMView

urlpatterns = [
    path('', ATMView.index, name='index'),

    path('create', ATMView.create, name='create'),
    path('update', ATMView.update, name='update'),
    path('get', ATMView.get, name='get'),
    path('getAll', ATMView.getAll, name='getAll'),
    path('delete', ATMView.delete, name='delete'),


    path('assignBranch', ATMView.assignBranch, name='assignBranch'),
    path('unassignBranch', ATMView.unassignBranch, name='unassignBranch'),



]