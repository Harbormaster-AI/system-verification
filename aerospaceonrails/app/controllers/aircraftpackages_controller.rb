class AircraftPackagesController < ApplicationController
  def index
    @aircraft_packages = AircraftPackage.all
  end
 
  def find
    @aircraft_package = AircraftPackage.find(params[:id])
  end
 
  def new
    @aircraft_package = AircraftPackage.new
  end
 
  def edit
    @aircraft_package = AircraftPackage.find(params[:id])
  end
 
  def create
    @aircraft_package = AircraftPackage.new(aircraft_package_params)
 
    if @aircraft_package.save
      redirect_to aircraft_packages_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_package = AircraftPackage.find(params[:id])
 
    if @aircraft_package.update(aircraft_package_params)
      redirect_to aircraft_packages_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_package = AircraftPackage.find(params[:id])
    @aircraft_package.destroy
    redirect_to aircraft_packages_path
  end

 
  private
    def aircraft_package_params
      params.require(:aircraft_package).permit(
        :name,
        :package_type
      )

  end
end