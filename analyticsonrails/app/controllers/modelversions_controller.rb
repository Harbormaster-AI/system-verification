class ModelVersionsController < ApplicationController
  def index
    @model_versions = ModelVersion.all
  end
 
  def find
    @model_version = ModelVersion.find(params[:id])
  end
 
  def new
    @model_version = ModelVersion.new
  end
 
  def edit
    @model_version = ModelVersion.find(params[:id])
  end
 
  def create
    @model_version = ModelVersion.new(model_version_params)
 
    if @model_version.save
      redirect_to model_versions_path
    else
      render 'new'
    end
  end
 
  def update
    @model_version = ModelVersion.find(params[:id])
 
    if @model_version.update(model_version_params)
      redirect_to model_versions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @model_version = ModelVersion.find(params[:id])
    @model_version.destroy
    redirect_to model_versions_path
  end

 
  private
    def model_version_params
      params.require(:model_version).permit(
        :version,
        :lifecycle,
        :training_status
      )

  end
end