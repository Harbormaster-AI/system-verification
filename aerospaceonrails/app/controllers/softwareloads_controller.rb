class SoftwareLoadsController < ApplicationController
  def index
    @software_loads = SoftwareLoad.all
  end
 
  def find
    @software_load = SoftwareLoad.find(params[:id])
  end
 
  def new
    @software_load = SoftwareLoad.new
  end
 
  def edit
    @software_load = SoftwareLoad.find(params[:id])
  end
 
  def create
    @software_load = SoftwareLoad.new(software_load_params)
 
    if @software_load.save
      redirect_to software_loads_path
    else
      render 'new'
    end
  end
 
  def update
    @software_load = SoftwareLoad.find(params[:id])
 
    if @software_load.update(software_load_params)
      redirect_to software_loads_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @software_load = SoftwareLoad.find(params[:id])
    @software_load.destroy
    redirect_to software_loads_path
  end

 
  private
    def software_load_params
      params.require(:software_load).permit(
        :version,
        :load_type
      )

  end
end