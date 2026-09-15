
class DeviceGroupsController < ApplicationController
  def index
    @deviceGroups = DeviceGroup.all
  end
 
  def show
    @deviceGroup = DeviceGroup.find(params[:id])
  end
 
  def new
    @deviceGroup = DeviceGroup.new
  end
 
  def edit
    @deviceGroup = DeviceGroup.find(params[:id])
  end
 
  def create
    @deviceGroup = DeviceGroup.new(deviceGroup_params)
 
    if @deviceGroup.save
      redirect_to deviceGroups_path
    else
      render 'new'
    end
  end
 
  def update
    @deviceGroup = DeviceGroup.find(params[:id])
 
    if @deviceGroup.update(deviceGroup_params)
      redirect_to deviceGroups_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deviceGroup = DeviceGroup.find(params[:id])
    @deviceGroup.destroy
    redirect_to deviceGroups_path
  end

 
  private
    def deviceGroup_params
      params.require(:deviceGroup).permit(:name, :criteria)
    end
end