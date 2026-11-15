class AnalyticsWorkspacesController < ApplicationController
  def index
    @analytics_workspaces = AnalyticsWorkspace.all
  end
 
  def find
    @analytics_workspace = AnalyticsWorkspace.find(params[:id])
  end
 
  def new
    @analytics_workspace = AnalyticsWorkspace.new
  end
 
  def edit
    @analytics_workspace = AnalyticsWorkspace.find(params[:id])
  end
 
  def create
    @analytics_workspace = AnalyticsWorkspace.new(analytics_workspace_params)
 
    if @analytics_workspace.save
      redirect_to analytics_workspaces_path
    else
      render 'new'
    end
  end
 
  def update
    @analytics_workspace = AnalyticsWorkspace.find(params[:id])
 
    if @analytics_workspace.update(analytics_workspace_params)
      redirect_to analytics_workspaces_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @analytics_workspace = AnalyticsWorkspace.find(params[:id])
    @analytics_workspace.destroy
    redirect_to analytics_workspaces_path
  end

 
  private
    def analytics_workspace_params
      params.require(:analytics_workspace).permit(
        :name,
        :business_domain,
        :owner_team,
        :governance_tier
      )

  end
end