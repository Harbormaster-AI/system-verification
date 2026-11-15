class DataPipelinesController < ApplicationController
  def index
    @data_pipelines = DataPipeline.all
  end
 
  def find
    @data_pipeline = DataPipeline.find(params[:id])
  end
 
  def new
    @data_pipeline = DataPipeline.new
  end
 
  def edit
    @data_pipeline = DataPipeline.find(params[:id])
  end
 
  def create
    @data_pipeline = DataPipeline.new(data_pipeline_params)
 
    if @data_pipeline.save
      redirect_to data_pipelines_path
    else
      render 'new'
    end
  end
 
  def update
    @data_pipeline = DataPipeline.find(params[:id])
 
    if @data_pipeline.update(data_pipeline_params)
      redirect_to data_pipelines_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @data_pipeline = DataPipeline.find(params[:id])
    @data_pipeline.destroy
    redirect_to data_pipelines_path
  end

 
  private
    def data_pipeline_params
      params.require(:data_pipeline).permit(
        :name,
        :schedule,
        :trigger_type,
        :status
      )

  end
end