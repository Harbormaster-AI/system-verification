class LandingGearsController < ApplicationController
  def index
    @landing_gears = LandingGear.all
  end
 
  def find
    @landing_gear = LandingGear.find(params[:id])
  end
 
  def new
    @landing_gear = LandingGear.new
  end
 
  def edit
    @landing_gear = LandingGear.find(params[:id])
  end
 
  def create
    @landing_gear = LandingGear.new(landing_gear_params)
 
    if @landing_gear.save
      redirect_to landing_gears_path
    else
      render 'new'
    end
  end
 
  def update
    @landing_gear = LandingGear.find(params[:id])
 
    if @landing_gear.update(landing_gear_params)
      redirect_to landing_gears_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @landing_gear = LandingGear.find(params[:id])
    @landing_gear.destroy
    redirect_to landing_gears_path
  end

 
  private
    def landing_gear_params
      params.require(:landing_gear).permit(
        :supplier_part_number,
        :gear_type
      )

  end
end