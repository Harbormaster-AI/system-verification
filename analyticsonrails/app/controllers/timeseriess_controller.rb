class TimeSeriessController < ApplicationController
  def index
    @time_seriess = TimeSeries.all
  end
 
  def find
    @time_series = TimeSeries.find(params[:id])
  end
 
  def new
    @time_series = TimeSeries.new
  end
 
  def edit
    @time_series = TimeSeries.find(params[:id])
  end
 
  def create
    @time_series = TimeSeries.new(time_series_params)
 
    if @time_series.save
      redirect_to time_seriess_path
    else
      render 'new'
    end
  end
 
  def update
    @time_series = TimeSeries.find(params[:id])
 
    if @time_series.update(time_series_params)
      redirect_to time_seriess_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @time_series = TimeSeries.find(params[:id])
    @time_series.destroy
    redirect_to time_seriess_path
  end

 
  private
    def time_series_params
      params.require(:time_series).permit(
        :name,
        :timezone,
        :granularity
      )

  end
end