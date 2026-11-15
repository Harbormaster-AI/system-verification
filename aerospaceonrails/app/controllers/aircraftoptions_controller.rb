class AircraftOptionsController < ApplicationController
  def index
    @aircraft_options = AircraftOption.all
  end
 
  def find
    @aircraft_option = AircraftOption.find(params[:id])
  end
 
  def new
    @aircraft_option = AircraftOption.new
  end
 
  def edit
    @aircraft_option = AircraftOption.find(params[:id])
  end
 
  def create
    @aircraft_option = AircraftOption.new(aircraft_option_params)
 
    if @aircraft_option.save
      redirect_to aircraft_options_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_option = AircraftOption.find(params[:id])
 
    if @aircraft_option.update(aircraft_option_params)
      redirect_to aircraft_options_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_option = AircraftOption.find(params[:id])
    @aircraft_option.destroy
    redirect_to aircraft_options_path
  end

 
  private
    def aircraft_option_params
      params.require(:aircraft_option).permit(
        :code,
        :name,
        :option_category
      )

  end
end