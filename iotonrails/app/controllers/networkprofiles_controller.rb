
class NetworkProfilesController < ApplicationController
  def index
    @networkProfiles = NetworkProfile.all
  end
 
  def show
    @networkProfile = NetworkProfile.find(params[:id])
  end
 
  def new
    @networkProfile = NetworkProfile.new
  end
 
  def edit
    @networkProfile = NetworkProfile.find(params[:id])
  end
 
  def create
    @networkProfile = NetworkProfile.new(networkProfile_params)
 
    if @networkProfile.save
      redirect_to networkProfiles_path
    else
      render 'new'
    end
  end
 
  def update
    @networkProfile = NetworkProfile.find(params[:id])
 
    if @networkProfile.update(networkProfile_params)
      redirect_to networkProfiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @networkProfile = NetworkProfile.find(params[:id])
    @networkProfile.destroy
    redirect_to networkProfiles_path
  end

 
  private
    def networkProfile_params
      params.require(:networkProfile).permit(:profileName, :ssid, :apn, :ConnectivityType)
    end
end