class ExchangeRatesController < ApplicationController
  def index
    @exchange_rates = ExchangeRate.all
  end
 
  def find
    @exchange_rate = ExchangeRate.find(params[:id])
  end
 
  def new
    @exchange_rate = ExchangeRate.new
  end
 
  def edit
    @exchange_rate = ExchangeRate.find(params[:id])
  end
 
  def create
    @exchange_rate = ExchangeRate.new(exchange_rate_params)
 
    if @exchange_rate.save
      redirect_to exchange_rates_path
    else
      render 'new'
    end
  end
 
  def update
    @exchange_rate = ExchangeRate.find(params[:id])
 
    if @exchange_rate.update(exchange_rate_params)
      redirect_to exchange_rates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @exchange_rate = ExchangeRate.find(params[:id])
    @exchange_rate.destroy
    redirect_to exchange_rates_path
  end

 
  private
    def exchange_rate_params
      params.require(:exchange_rate).permit(
        :base_currency,
        :counter_currency,
        :rate,
        :as_of,
        :source
      )

