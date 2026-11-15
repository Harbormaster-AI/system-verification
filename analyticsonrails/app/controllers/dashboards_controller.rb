class DashboardsController < ApplicationController
  def index
    @dashboards = Dashboard.all
  end
 
  def find
    @dashboard = Dashboard.find(params[:id])
  end
 
  def new
    @dashboard = Dashboard.new
  end
 
  def edit
    @dashboard = Dashboard.find(params[:id])
  end
 
  def create
    @dashboard = Dashboard.new(dashboard_params)
 
    if @dashboard.save
      redirect_to dashboards_path
    else
      render 'new'
    end
  end
 
  def update
    @dashboard = Dashboard.find(params[:id])
 
    if @dashboard.update(dashboard_params)
      redirect_to dashboards_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dashboard = Dashboard.find(params[:id])
    @dashboard.destroy
    redirect_to dashboards_path
  end

 
  private
    def dashboard_params
      params.require(:dashboard).permit(
        :title,
        :theme,
        :status
      )

  end
end