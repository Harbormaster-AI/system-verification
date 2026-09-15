
class SensorInstancesController < ApplicationController
  def index
    @sensorInstances = SensorInstance.all
  end
 
  def show
    @sensorInstance = SensorInstance.find(params[:id])
  end
 
  def new
    @sensorInstance = SensorInstance.new
  end
 
  def edit
    @sensorInstance = SensorInstance.find(params[:id])
  end
 
  def create
    @sensorInstance = SensorInstance.new(sensorInstance_params)
 
    if @sensorInstance.save
      redirect_to sensorInstances_path
    else
      render 'new'
    end
  end
 
  def update
    @sensorInstance = SensorInstance.find(params[:id])
 
    if @sensorInstance.update(sensorInstance_params)
      redirect_to sensorInstances_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @sensorInstance = SensorInstance.find(params[:id])
    @sensorInstance.destroy
    redirect_to sensorInstances_path
  end

 
  private
    def sensorInstance_params
      params.require(:sensorInstance).permit(:name, :unit, :samplingIntervalMs, :SensorType)
    end
end