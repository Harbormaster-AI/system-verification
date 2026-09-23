
class DeviceCriterionsController < ApplicationController
  def index
    @deviceCriterions = DeviceCriterion.all
  end
 
  def find
    @deviceCriterion = DeviceCriterion.find(params[:id])
  end
 
  def new
    @deviceCriterion = DeviceCriterion.new
  end
 
  def edit
    @deviceCriterion = DeviceCriterion.find(params[:id])
  end
 
  def create
    @deviceCriterion = DeviceCriterion.new(deviceCriterion_params)
 
    if @deviceCriterion.save
      redirect_to deviceCriterions_path
    else
      render 'new'
    end
  end
 
  def update
    @deviceCriterion = DeviceCriterion.find(params[:id])
 
    if @deviceCriterion.update(deviceCriterion_params)
      redirect_to deviceCriterions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deviceCriterion = DeviceCriterion.find(params[:id])
    @deviceCriterion.destroy
    redirect_to deviceCriterions_path
  end

 
  private
    def deviceCriterion_params
      params.require(:deviceCriterion).permit(:DeviceType, :PlatformType, :Operator_)
    end
end