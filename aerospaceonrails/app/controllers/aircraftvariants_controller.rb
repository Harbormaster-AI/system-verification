class AircraftVariantsController < ApplicationController
  def index
    @aircraft_variants = AircraftVariant.all
  end
 
  def find
    @aircraft_variant = AircraftVariant.find(params[:id])
  end
 
  def new
    @aircraft_variant = AircraftVariant.new
  end
 
  def edit
    @aircraft_variant = AircraftVariant.find(params[:id])
  end
 
  def create
    @aircraft_variant = AircraftVariant.new(aircraft_variant_params)
 
    if @aircraft_variant.save
      redirect_to aircraft_variants_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_variant = AircraftVariant.find(params[:id])
 
    if @aircraft_variant.update(aircraft_variant_params)
      redirect_to aircraft_variants_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_variant = AircraftVariant.find(params[:id])
    @aircraft_variant.destroy
    redirect_to aircraft_variants_path
  end

 
  private
    def aircraft_variant_params
      params.require(:aircraft_variant).permit(
        :variant_code,
        :range_nm,
        :max_takeoff_weight_kg
      )

  end
end