
class PerformanceMetricsController < ApplicationController
  def index
    @performanceMetrics = PerformanceMetric.all
  end
 
  def find
    @performanceMetric = PerformanceMetric.find(params[:id])
  end
 
  def new
    @performanceMetric = PerformanceMetric.new
  end
 
  def edit
    @performanceMetric = PerformanceMetric.find(params[:id])
  end
 
  def create
    @performanceMetric = PerformanceMetric.new(performanceMetric_params)
 
    if @performanceMetric.save
      redirect_to performanceMetrics_path
    else
      render 'new'
    end
  end
 
  def update
    @performanceMetric = PerformanceMetric.find(params[:id])
 
    if @performanceMetric.update(performanceMetric_params)
      redirect_to performanceMetrics_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @performanceMetric = PerformanceMetric.find(params[:id])
    @performanceMetric.destroy
    redirect_to performanceMetrics_path
  end

 
  private
    def performanceMetric_params
      params.require(:performanceMetric).permit(:date, :value, :MetricType)
    end
end