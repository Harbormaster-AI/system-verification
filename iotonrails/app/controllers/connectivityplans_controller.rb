
class ConnectivityPlansController < ApplicationController
  def index
    @connectivityPlans = ConnectivityPlan.all
  end
 
  def show
    @connectivityPlan = ConnectivityPlan.find(params[:id])
  end
 
  def new
    @connectivityPlan = ConnectivityPlan.new
  end
 
  def edit
    @connectivityPlan = ConnectivityPlan.find(params[:id])
  end
 
  def create
    @connectivityPlan = ConnectivityPlan.new(connectivityPlan_params)
 
    if @connectivityPlan.save
      redirect_to connectivityPlans_path
    else
      render 'new'
    end
  end
 
  def update
    @connectivityPlan = ConnectivityPlan.find(params[:id])
 
    if @connectivityPlan.update(connectivityPlan_params)
      redirect_to connectivityPlans_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @connectivityPlan = ConnectivityPlan.find(params[:id])
    @connectivityPlan.destroy
    redirect_to connectivityPlans_path
  end

 
  private
    def connectivityPlan_params
      params.require(:connectivityPlan).permit(:name, :dataCapMB, :billingCycleDays)
    end
end