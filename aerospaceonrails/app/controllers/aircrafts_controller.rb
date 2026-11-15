class AircraftsController < ApplicationController
  def index
    @aircrafts = Aircraft.all
  end
 
  def find
    @aircraft = Aircraft.find(params[:id])
  end
 
  def new
    @aircraft = Aircraft.new
  end
 
  def edit
    @aircraft = Aircraft.find(params[:id])
  end
 
  def create
    @aircraft = Aircraft.new(aircraft_params)
 
    if @aircraft.save
      redirect_to aircrafts_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft = Aircraft.find(params[:id])
 
    if @aircraft.update(aircraft_params)
      redirect_to aircrafts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft = Aircraft.find(params[:id])
    @aircraft.destroy
    redirect_to aircrafts_path
  end

 
  private
    def aircraft_params
      params.require(:aircraft).permit(
        :msn,
        :delivery_date
      )

  end
end