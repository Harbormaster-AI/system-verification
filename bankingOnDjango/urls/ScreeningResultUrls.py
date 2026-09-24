from django.urls import path


from bankingOnDjango.views import ScreeningResultView

urlpatterns = [
    path('', ScreeningResultView.index, name='index'),

    path('create', ScreeningResultView.create, name='create'),
    path('update', ScreeningResultView.update, name='update'),
    path('get', ScreeningResultView.get, name='get'),
    path('getAll', ScreeningResultView.getAll, name='getAll'),
    path('delete', ScreeningResultView.delete, name='delete'),


    path('assignKycProfile', ScreeningResultView.assignKycProfile, name='assignKycProfile'),
    path('unassignKycProfile', ScreeningResultView.unassignKycProfile, name='unassignKycProfile'),



]