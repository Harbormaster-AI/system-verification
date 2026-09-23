
class GeoRegionsController < ApplicationController
  def index
    @geoRegions = GeoRegion.all
  end
 
  def find
    @geoRegion = GeoRegion.find(params[:id])
  end
 
  def new
    @geoRegion = GeoRegion.new
  end
 
  def edit
    @geoRegion = GeoRegion.find(params[:id])
  end
 
  def create
    @geoRegion = GeoRegion.new(geoRegion_params)
 
    if @geoRegion.save
      redirect_to geoRegions_path
    else
      render 'new'
    end
  end
 
  def update
    @geoRegion = GeoRegion.find(params[:id])
 
    if @geoRegion.update(geoRegion_params)
      redirect_to geoRegions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @geoRegion = GeoRegion.find(params[:id])
    @geoRegion.destroy
    redirect_to geoRegions_path
  end

 
  private
    def geoRegion_params
      params.require(:geoRegion).permit(:code, :name, :RegionType)
    end
end