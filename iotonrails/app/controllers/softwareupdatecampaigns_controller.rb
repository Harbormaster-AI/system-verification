
class SoftwareUpdateCampaignsController < ApplicationController
  def index
    @softwareUpdateCampaigns = SoftwareUpdateCampaign.all
  end
 
  def show
    @softwareUpdateCampaign = SoftwareUpdateCampaign.find(params[:id])
  end
 
  def new
    @softwareUpdateCampaign = SoftwareUpdateCampaign.new
  end
 
  def edit
    @softwareUpdateCampaign = SoftwareUpdateCampaign.find(params[:id])
  end
 
  def create
    @softwareUpdateCampaign = SoftwareUpdateCampaign.new(softwareUpdateCampaign_params)
 
    if @softwareUpdateCampaign.save
      redirect_to softwareUpdateCampaigns_path
    else
      render 'new'
    end
  end
 
  def update
    @softwareUpdateCampaign = SoftwareUpdateCampaign.find(params[:id])
 
    if @softwareUpdateCampaign.update(softwareUpdateCampaign_params)
      redirect_to softwareUpdateCampaigns_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @softwareUpdateCampaign = SoftwareUpdateCampaign.find(params[:id])
    @softwareUpdateCampaign.destroy
    redirect_to softwareUpdateCampaigns_path
  end

 
  private
    def softwareUpdateCampaign_params
      params.require(:softwareUpdateCampaign).permit(:campaignCode, :scheduledStart, :scheduledEnd, :Status)
    end
end