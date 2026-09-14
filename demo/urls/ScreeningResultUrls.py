from django.urls import path
from demo.views import ScreeningResultView

urlpatterns = [
    path('', ScreeningResultView.index, name='index'),
	path('create', ScreeningResultView.get, name='create'),
	path('get/<int:screeningResultId>/', ScreeningResultView.get, name='get'),
	path('save', ScreeningResultView.save, name='save'),
	path('getAll', ScreeningResultView.getAll, name='getAll'),
	path('delete/<int:screeningResultId>/', ScreeningResultView.delete, name='delete'),
	path('assignKycProfile/<int:screeningResultId>/<int:KycProfileId>/', ScreeningResultView.assignKycProfile, name='assignKycProfile'),
	path('unassignKycProfile/<int:screeningResultId>/', ScreeningResultView.unassignKycProfile, name='unassignKycProfile'),
]
