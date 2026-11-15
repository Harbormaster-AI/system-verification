class AircraftModelsController < ApplicationController
  def index
    @aircraft_models = AircraftModel.all
  end
 
  def find
    @aircraft_model = AircraftModel.find(params[:id])
  end
 
  def new
    @aircraft_model = AircraftModel.new
  end
 
  def edit
    @aircraft_model = AircraftModel.find(params[:id])
  end
 
  def create
    @aircraft_model = AircraftModel.new(aircraft_model_params)
 
    if @aircraft_model.save
      redirect_to aircraft_models_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_model = AircraftModel.find(params[:id])
 
    if @aircraft_model.update(aircraft_model_params)
      redirect_to aircraft_models_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_model = AircraftModel.find(params[:id])
    @aircraft_model.destroy
    redirect_to aircraft_models_path
  end

 
  private
    def aircraft_model_params
      params.require(:aircraft_model).permit(
        :name,
        :model_designation,
        :aircraft_type
      )

  end
end