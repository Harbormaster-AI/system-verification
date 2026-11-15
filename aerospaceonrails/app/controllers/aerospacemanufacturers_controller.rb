class AerospaceManufacturersController < ApplicationController
  def index
    @aerospace_manufacturers = AerospaceManufacturer.all
  end
 
  def find
    @aerospace_manufacturer = AerospaceManufacturer.find(params[:id])
  end
 
  def new
    @aerospace_manufacturer = AerospaceManufacturer.new
  end
 
  def edit
    @aerospace_manufacturer = AerospaceManufacturer.find(params[:id])
  end
 
  def create
    @aerospace_manufacturer = AerospaceManufacturer.new(aerospace_manufacturer_params)
 
    if @aerospace_manufacturer.save
      redirect_to aerospace_manufacturers_path
    else
      render 'new'
    end
  end
 
  def update
    @aerospace_manufacturer = AerospaceManufacturer.find(params[:id])
 
    if @aerospace_manufacturer.update(aerospace_manufacturer_params)
      redirect_to aerospace_manufacturers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aerospace_manufacturer = AerospaceManufacturer.find(params[:id])
    @aerospace_manufacturer.destroy
    redirect_to aerospace_manufacturers_path
  end

 
  private
    def aerospace_manufacturer_params
      params.require(:aerospace_manufacturer).permit(
        :name,
        :legal_name,
        :headquarters_country,
        :website
      )

  end
end