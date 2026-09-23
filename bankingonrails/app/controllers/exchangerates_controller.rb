class ExchangeRatesController < ApplicationController
  def index
    @_exchange_rates = ExchangeRate.all
  end
 
  def find
    @_exchange_rate = ExchangeRate.find(params[:id])
  end
 
  def new
    @_exchange_rate = ExchangeRate.new
  end
 
  def edit
    @_exchange_rate = ExchangeRate.find(params[:id])
  end
 
  def create
    @_exchange_rate = ExchangeRate.new(_exchange_rate_params)
 
    if @_exchange_rate.save
      redirect_to _exchange_rates_path
    else
      render 'new'
    end
  end
 
  def update
    @_exchange_rate = ExchangeRate.find(params[:id])
 
    if @_exchange_rate.update(_exchange_rate_params)
      redirect_to _exchange_rates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_exchange_rate = ExchangeRate.find(params[:id])
    @_exchange_rate.destroy
    redirect_to _exchange_rates_path
  end

 
  private
    def _exchange_rate_params
      params.require(:_exchange_rate).permit(
        :base_currency,
        :counter_currency,
        :rate,
        :as_of,
      )

