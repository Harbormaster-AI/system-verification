
class AdvertisersController < ApplicationController
  def index
    @advertisers = Advertiser.all
  end
 
  def find
    @advertiser = Advertiser.find(params[:id])
  end
 
  def new
    @advertiser = Advertiser.new
  end
 
  def edit
    @advertiser = Advertiser.find(params[:id])
  end
 
  def create
    @advertiser = Advertiser.new(advertiser_params)
 
    if @advertiser.save
      redirect_to advertisers_path
    else
      render 'new'
    end
  end
 
  def update
    @advertiser = Advertiser.find(params[:id])
 
    if @advertiser.update(advertiser_params)
      redirect_to advertisers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @advertiser = Advertiser.find(params[:id])
    @advertiser.destroy
    redirect_to advertisers_path
  end

 
  private
    def advertiser_params
      params.require(:advertiser).permit(:name, :legalName, :industry, :website)
    end
end