class ExchangeRatesController < ApplicationController
  def index
    @exchangeRates = ExchangeRate.all
  end
 
  def show
    @exchangeRate = ExchangeRate.find(params[:id])
  end
 
  def new
    @exchangeRate = ExchangeRate.new
  end
 
  def edit
    @exchangeRate = ExchangeRate.find(params[:id])
  end
 
  def create
    @exchangeRate = ExchangeRate.new(exchangeRate_params)
 
    if @exchangeRate.save
      redirect_to exchangeRates_path
    else
      render 'new'
    end
  end
 
  def update
    @exchangeRate = ExchangeRate.find(params[:id])
 
    if @exchangeRate.update(exchangeRate_params)
      redirect_to exchangeRates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @exchangeRate = ExchangeRate.find(params[:id])
    @exchangeRate.destroy
    redirect_to exchangeRates_path
  end

 
  private
    def exchangeRate_params
      params.require(:exchangeRate).permit(:baseCurrency, :counterCurrency, :rate, :asOf, :source)
    end
end