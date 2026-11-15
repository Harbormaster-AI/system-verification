class EngineTypesController < ApplicationController
  def index
    @engine_types = EngineType.all
  end
 
  def find
    @engine_type = EngineType.find(params[:id])
  end
 
  def new
    @engine_type = EngineType.new
  end
 
  def edit
    @engine_type = EngineType.find(params[:id])
  end
 
  def create
    @engine_type = EngineType.new(engine_type_params)
 
    if @engine_type.save
      redirect_to engine_types_path
    else
      render 'new'
    end
  end
 
  def update
    @engine_type = EngineType.find(params[:id])
 
    if @engine_type.update(engine_type_params)
      redirect_to engine_types_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @engine_type = EngineType.find(params[:id])
    @engine_type.destroy
    redirect_to engine_types_path
  end

 
  private
    def engine_type_params
      params.require(:engine_type).permit(
        :engine_model_code,
        :max_thrust_kn,
        :category
      )

  end
end