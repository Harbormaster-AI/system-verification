class SalesRegionsController < ApplicationController
  def index
    @sales_regions = SalesRegion.all
  end
 
  def find
    @sales_region = SalesRegion.find(params[:id])
  end
 
  def new
    @sales_region = SalesRegion.new
  end
 
  def edit
    @sales_region = SalesRegion.find(params[:id])
  end
 
  def create
    @sales_region = SalesRegion.new(sales_region_params)
 
    if @sales_region.save
      redirect_to sales_regions_path
    else
      render 'new'
    end
  end
 
  def update
    @sales_region = SalesRegion.find(params[:id])
 
    if @sales_region.update(sales_region_params)
      redirect_to sales_regions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @sales_region = SalesRegion.find(params[:id])
    @sales_region.destroy
    redirect_to sales_regions_path
  end

 
  private
    def sales_region_params
      params.require(:sales_region).permit(
        :name,
        :region_code
      )

  end
end