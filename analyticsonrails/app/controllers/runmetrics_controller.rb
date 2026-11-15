class RunMetricsController < ApplicationController
  def index
    @run_metrics = RunMetric.all
  end
 
  def find
    @run_metric = RunMetric.find(params[:id])
  end
 
  def new
    @run_metric = RunMetric.new
  end
 
  def edit
    @run_metric = RunMetric.find(params[:id])
  end
 
  def create
    @run_metric = RunMetric.new(run_metric_params)
 
    if @run_metric.save
      redirect_to run_metrics_path
    else
      render 'new'
    end
  end
 
  def update
    @run_metric = RunMetric.find(params[:id])
 
    if @run_metric.update(run_metric_params)
      redirect_to run_metrics_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @run_metric = RunMetric.find(params[:id])
    @run_metric.destroy
    redirect_to run_metrics_path
  end

 
  private
    def run_metric_params
      params.require(:run_metric).permit(
        :name,
        :value
      )

  end
end