class KycProfilesController < ApplicationController
  def index
    @kycProfiles = KycProfile.all
  end
 
  def show
    @kycProfile = KycProfile.find(params[:id])
  end
 
  def new
    @kycProfile = KycProfile.new
  end
 
  def edit
    @kycProfile = KycProfile.find(params[:id])
  end
 
  def create
    @kycProfile = KycProfile.new(kycProfile_params)
 
    if @kycProfile.save
      redirect_to kycProfiles_path
    else
      render 'new'
    end
  end
 
  def update
    @kycProfile = KycProfile.find(params[:id])
 
    if @kycProfile.update(kycProfile_params)
      redirect_to kycProfiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @kycProfile = KycProfile.find(params[:id])
    @kycProfile.destroy
    redirect_to kycProfiles_path
  end

 
  private
    def kycProfile_params
      params.require(:kycProfile).permit(:profileId, :lastReviewedOn, :Status)
    end
end