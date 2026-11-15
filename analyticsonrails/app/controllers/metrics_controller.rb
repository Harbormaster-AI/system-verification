class MetricsController < ApplicationController
  def index
    @metrics = Metric.all
  end
 
  def find
    @metric = Metric.find(params[:id])
  end
 
  def new
    @metric = Metric.new
  end
 
  def edit
    @metric = Metric.find(params[:id])
  end
 
  def create
    @metric = Metric.new(metric_params)
 
    if @metric.save
      redirect_to metrics_path
    else
      render 'new'
    end
  end
 
  def update
    @metric = Metric.find(params[:id])
 
    if @metric.update(metric_params)
      redirect_to metrics_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @metric = Metric.find(params[:id])
    @metric.destroy
    redirect_to metrics_path
  end

 
  private
    def metric_params
      params.require(:metric).permit(
        :name,
        :expression,
        :unit,
        :metric_type
      )

  end
end