class ConnectedAircraftsController < ApplicationController
  def index
    @connected_aircrafts = ConnectedAircraft.all
  end
 
  def find
    @connected_aircraft = ConnectedAircraft.find(params[:id])
  end
 
  def new
    @connected_aircraft = ConnectedAircraft.new
  end
 
  def edit
    @connected_aircraft = ConnectedAircraft.find(params[:id])
  end
 
  def create
    @connected_aircraft = ConnectedAircraft.new(connected_aircraft_params)
 
    if @connected_aircraft.save
      redirect_to connected_aircrafts_path
    else
      render 'new'
    end
  end
 
  def update
    @connected_aircraft = ConnectedAircraft.find(params[:id])
 
    if @connected_aircraft.update(connected_aircraft_params)
      redirect_to connected_aircrafts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @connected_aircraft = ConnectedAircraft.find(params[:id])
    @connected_aircraft.destroy
    redirect_to connected_aircrafts_path
  end

 
  private
    def connected_aircraft_params
      params.require(:connected_aircraft).permit(
        :communications_provider,
        :connectivity_status
      )

  end
end