class WorkCentersController < ApplicationController
  def index
    @work_centers = WorkCenter.all
  end
 
  def find
    @work_center = WorkCenter.find(params[:id])
  end
 
  def new
    @work_center = WorkCenter.new
  end
 
  def edit
    @work_center = WorkCenter.find(params[:id])
  end
 
  def create
    @work_center = WorkCenter.new(work_center_params)
 
    if @work_center.save
      redirect_to work_centers_path
    else
      render 'new'
    end
  end
 
  def update
    @work_center = WorkCenter.find(params[:id])
 
    if @work_center.update(work_center_params)
      redirect_to work_centers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @work_center = WorkCenter.find(params[:id])
    @work_center.destroy
    redirect_to work_centers_path
  end

 
  private
    def work_center_params
      params.require(:work_center).permit(
        :name,
        :capability
      )

  end
end