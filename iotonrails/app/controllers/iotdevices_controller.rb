
class IoTDevicesController < ApplicationController
  def index
    @ioTDevices = IoTDevice.all
  end
 
  def show
    @ioTDevice = IoTDevice.find(params[:id])
  end
 
  def new
    @ioTDevice = IoTDevice.new
  end
 
  def edit
    @ioTDevice = IoTDevice.find(params[:id])
  end
 
  def create
    @ioTDevice = IoTDevice.new(ioTDevice_params)
 
    if @ioTDevice.save
      redirect_to ioTDevices_path
    else
      render 'new'
    end
  end
 
  def update
    @ioTDevice = IoTDevice.find(params[:id])
 
    if @ioTDevice.update(ioTDevice_params)
      redirect_to ioTDevices_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @ioTDevice = IoTDevice.find(params[:id])
    @ioTDevice.destroy
    redirect_to ioTDevices_path
  end

 
  private
    def ioTDevice_params
      params.require(:ioTDevice).permit(:deviceId, :serialNumber, :lastSeen, :firmwareVersion, :Status, :PowerSource)
    end
end