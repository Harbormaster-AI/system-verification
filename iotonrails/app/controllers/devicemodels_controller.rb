
class DeviceModelsController < ApplicationController
  def index
    @deviceModels = DeviceModel.all
  end
 
  def show
    @deviceModel = DeviceModel.find(params[:id])
  end
 
  def new
    @deviceModel = DeviceModel.new
  end
 
  def edit
    @deviceModel = DeviceModel.find(params[:id])
  end
 
  def create
    @deviceModel = DeviceModel.new(deviceModel_params)
 
    if @deviceModel.save
      redirect_to deviceModels_path
    else
      render 'new'
    end
  end
 
  def update
    @deviceModel = DeviceModel.find(params[:id])
 
    if @deviceModel.update(deviceModel_params)
      redirect_to deviceModels_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deviceModel = DeviceModel.find(params[:id])
    @deviceModel.destroy
    redirect_to deviceModels_path
  end

 
  private
    def deviceModel_params
      params.require(:deviceModel).permit(:name, :modelNumber, :hardwareRevision, :SupportedConnectivity, :DefaultTelemetryEncoding)
    end
end