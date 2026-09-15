
class EdgeApplicationsController < ApplicationController
  def index
    @edgeApplications = EdgeApplication.all
  end
 
  def show
    @edgeApplication = EdgeApplication.find(params[:id])
  end
 
  def new
    @edgeApplication = EdgeApplication.new
  end
 
  def edit
    @edgeApplication = EdgeApplication.find(params[:id])
  end
 
  def create
    @edgeApplication = EdgeApplication.new(edgeApplication_params)
 
    if @edgeApplication.save
      redirect_to edgeApplications_path
    else
      render 'new'
    end
  end
 
  def update
    @edgeApplication = EdgeApplication.find(params[:id])
 
    if @edgeApplication.update(edgeApplication_params)
      redirect_to edgeApplications_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @edgeApplication = EdgeApplication.find(params[:id])
    @edgeApplication.destroy
    redirect_to edgeApplications_path
  end

 
  private
    def edgeApplication_params
      params.require(:edgeApplication).permit(:name, :version, :image, :Status)
    end
end