
class DeviceVendorsController < ApplicationController
  def index
    @deviceVendors = DeviceVendor.all
  end
 
  def show
    @deviceVendor = DeviceVendor.find(params[:id])
  end
 
  def new
    @deviceVendor = DeviceVendor.new
  end
 
  def edit
    @deviceVendor = DeviceVendor.find(params[:id])
  end
 
  def create
    @deviceVendor = DeviceVendor.new(deviceVendor_params)
 
    if @deviceVendor.save
      redirect_to deviceVendors_path
    else
      render 'new'
    end
  end
 
  def update
    @deviceVendor = DeviceVendor.find(params[:id])
 
    if @deviceVendor.update(deviceVendor_params)
      redirect_to deviceVendors_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deviceVendor = DeviceVendor.find(params[:id])
    @deviceVendor.destroy
    redirect_to deviceVendors_path
  end

 
  private
    def deviceVendor_params
      params.require(:deviceVendor).permit(:name, :legalName, :headquartersCountry, :website)
    end
end