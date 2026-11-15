class SalesCampaignsController < ApplicationController
  def index
    @sales_campaigns = SalesCampaign.all
  end
 
  def find
    @sales_campaign = SalesCampaign.find(params[:id])
  end
 
  def new
    @sales_campaign = SalesCampaign.new
  end
 
  def edit
    @sales_campaign = SalesCampaign.find(params[:id])
  end
 
  def create
    @sales_campaign = SalesCampaign.new(sales_campaign_params)
 
    if @sales_campaign.save
      redirect_to sales_campaigns_path
    else
      render 'new'
    end
  end
 
  def update
    @sales_campaign = SalesCampaign.find(params[:id])
 
    if @sales_campaign.update(sales_campaign_params)
      redirect_to sales_campaigns_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @sales_campaign = SalesCampaign.find(params[:id])
    @sales_campaign.destroy
    redirect_to sales_campaigns_path
  end

 
  private
    def sales_campaign_params
      params.require(:sales_campaign).permit(
        :campaign_code,
        :status
      )

  end
end