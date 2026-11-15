class ForecastsController < ApplicationController
  def index
    @forecasts = Forecast.all
  end
 
  def find
    @forecast = Forecast.find(params[:id])
  end
 
  def new
    @forecast = Forecast.new
  end
 
  def edit
    @forecast = Forecast.find(params[:id])
  end
 
  def create
    @forecast = Forecast.new(forecast_params)
 
    if @forecast.save
      redirect_to forecasts_path
    else
      render 'new'
    end
  end
 
  def update
    @forecast = Forecast.find(params[:id])
 
    if @forecast.update(forecast_params)
      redirect_to forecasts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @forecast = Forecast.find(params[:id])
    @forecast.destroy
    redirect_to forecasts_path
  end

 
  private
    def forecast_params
      params.require(:forecast).permit(
        :name,
        :horizon,
        :granularity
      )

  end
end