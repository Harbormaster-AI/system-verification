from django.urls import path
from demo.views import ExchangeRateView

urlpatterns = [
    path('', ExchangeRateView.index, name='index'),
	path('create', ExchangeRateView.get, name='create'),
	path('get/<int:exchangeRateId>/', ExchangeRateView.get, name='get'),
	path('save', ExchangeRateView.save, name='save'),
	path('getAll', ExchangeRateView.getAll, name='getAll'),
	path('delete/<int:exchangeRateId>/', ExchangeRateView.delete, name='delete'),
	path('assignBank/<int:exchangeRateId>/<int:BankId>/', ExchangeRateView.assignBank, name='assignBank'),
	path('unassignBank/<int:exchangeRateId>/', ExchangeRateView.unassignBank, name='unassignBank'),
	path('addFxTrades/<int:exchangeRateId>/<FxTradesIds>/', ExchangeRateView.addFxTrades, name='addFxTrades'),
	path('removeFxTrades/<int:exchangeRateId>/<FxTradesIds>/', ExchangeRateView.removeFxTrades, name='removeFxTrades'),
]
