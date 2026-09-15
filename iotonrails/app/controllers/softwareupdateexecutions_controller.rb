
class SoftwareUpdateExecutionsController < ApplicationController
  def index
    @softwareUpdateExecutions = SoftwareUpdateExecution.all
  end
 
  def show
    @softwareUpdateExecution = SoftwareUpdateExecution.find(params[:id])
  end
 
  def new
    @softwareUpdateExecution = SoftwareUpdateExecution.new
  end
 
  def edit
    @softwareUpdateExecution = SoftwareUpdateExecution.find(params[:id])
  end
 
  def create
    @softwareUpdateExecution = SoftwareUpdateExecution.new(softwareUpdateExecution_params)
 
    if @softwareUpdateExecution.save
      redirect_to softwareUpdateExecutions_path
    else
      render 'new'
    end
  end
 
  def update
    @softwareUpdateExecution = SoftwareUpdateExecution.find(params[:id])
 
    if @softwareUpdateExecution.update(softwareUpdateExecution_params)
      redirect_to softwareUpdateExecutions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @softwareUpdateExecution = SoftwareUpdateExecution.find(params[:id])
    @softwareUpdateExecution.destroy
    redirect_to softwareUpdateExecutions_path
  end

 
  private
    def softwareUpdateExecution_params
      params.require(:softwareUpdateExecution).permit(:startedAt, :completedAt, :Status)
    end
end