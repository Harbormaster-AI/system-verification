class EvaluationMetricsController < ApplicationController
  def index
    @evaluation_metrics = EvaluationMetric.all
  end
 
  def find
    @evaluation_metric = EvaluationMetric.find(params[:id])
  end
 
  def new
    @evaluation_metric = EvaluationMetric.new
  end
 
  def edit
    @evaluation_metric = EvaluationMetric.find(params[:id])
  end
 
  def create
    @evaluation_metric = EvaluationMetric.new(evaluation_metric_params)
 
    if @evaluation_metric.save
      redirect_to evaluation_metrics_path
    else
      render 'new'
    end
  end
 
  def update
    @evaluation_metric = EvaluationMetric.find(params[:id])
 
    if @evaluation_metric.update(evaluation_metric_params)
      redirect_to evaluation_metrics_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @evaluation_metric = EvaluationMetric.find(params[:id])
    @evaluation_metric.destroy
    redirect_to evaluation_metrics_path
  end

 
  private
    def evaluation_metric_params
      params.require(:evaluation_metric).permit(
        :name,
        :value
      )

  end
end