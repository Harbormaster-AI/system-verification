
class ActuatorInstancesController < ApplicationController
  def index
    @actuatorInstances = ActuatorInstance.all
  end
 
  def show
    @actuatorInstance = ActuatorInstance.find(params[:id])
  end
 
  def new
    @actuatorInstance = ActuatorInstance.new
  end
 
  def edit
    @actuatorInstance = ActuatorInstance.find(params[:id])
  end
 
  def create
    @actuatorInstance = ActuatorInstance.new(actuatorInstance_params)
 
    if @actuatorInstance.save
      redirect_to actuatorInstances_path
    else
      render 'new'
    end
  end
 
  def update
    @actuatorInstance = ActuatorInstance.find(params[:id])
 
    if @actuatorInstance.update(actuatorInstance_params)
      redirect_to actuatorInstances_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @actuatorInstance = ActuatorInstance.find(params[:id])
    @actuatorInstance.destroy
    redirect_to actuatorInstances_path
  end

 
  private
    def actuatorInstance_params
      params.require(:actuatorInstance).permit(:name, :commandTopic, :ActuatorType)
    end
end