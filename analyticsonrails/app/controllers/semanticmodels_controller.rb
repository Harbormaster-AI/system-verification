class SemanticModelsController < ApplicationController
  def index
    @semantic_models = SemanticModel.all
  end
 
  def find
    @semantic_model = SemanticModel.find(params[:id])
  end
 
  def new
    @semantic_model = SemanticModel.new
  end
 
  def edit
    @semantic_model = SemanticModel.find(params[:id])
  end
 
  def create
    @semantic_model = SemanticModel.new(semantic_model_params)
 
    if @semantic_model.save
      redirect_to semantic_models_path
    else
      render 'new'
    end
  end
 
  def update
    @semantic_model = SemanticModel.find(params[:id])
 
    if @semantic_model.update(semantic_model_params)
      redirect_to semantic_models_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @semantic_model = SemanticModel.find(params[:id])
    @semantic_model.destroy
    redirect_to semantic_models_path
  end

 
  private
    def semantic_model_params
      params.require(:semantic_model).permit(
        :name,
        :version,
        :grain
      )

  end
end