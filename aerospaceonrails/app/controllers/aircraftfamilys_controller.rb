class AircraftFamilysController < ApplicationController
  def index
    @aircraft_familys = AircraftFamily.all
  end
 
  def find
    @aircraft_family = AircraftFamily.find(params[:id])
  end
 
  def new
    @aircraft_family = AircraftFamily.new
  end
 
  def edit
    @aircraft_family = AircraftFamily.find(params[:id])
  end
 
  def create
    @aircraft_family = AircraftFamily.new(aircraft_family_params)
 
    if @aircraft_family.save
      redirect_to aircraft_familys_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_family = AircraftFamily.find(params[:id])
 
    if @aircraft_family.update(aircraft_family_params)
      redirect_to aircraft_familys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_family = AircraftFamily.find(params[:id])
    @aircraft_family.destroy
    redirect_to aircraft_familys_path
  end

 
  private
    def aircraft_family_params
      params.require(:aircraft_family).permit(
        :name,
        :family_code
      )

  end
end