
class HardwareModulesController < ApplicationController
  def index
    @hardwareModules = HardwareModule.all
  end
 
  def show
    @hardwareModule = HardwareModule.find(params[:id])
  end
 
  def new
    @hardwareModule = HardwareModule.new
  end
 
  def edit
    @hardwareModule = HardwareModule.find(params[:id])
  end
 
  def create
    @hardwareModule = HardwareModule.new(hardwareModule_params)
 
    if @hardwareModule.save
      redirect_to hardwareModules_path
    else
      render 'new'
    end
  end
 
  def update
    @hardwareModule = HardwareModule.find(params[:id])
 
    if @hardwareModule.update(hardwareModule_params)
      redirect_to hardwareModules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @hardwareModule = HardwareModule.find(params[:id])
    @hardwareModule.destroy
    redirect_to hardwareModules_path
  end

 
  private
    def hardwareModule_params
      params.require(:hardwareModule).permit(:moduleCode, :datasheetUri, :ModuleType)
    end
end