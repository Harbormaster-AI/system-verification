class KycProfilesController < ApplicationController
  def index
    @_kyc_profiles = KycProfile.all
  end
 
  def find
    @_kyc_profile = KycProfile.find(params[:id])
  end
 
  def new
    @_kyc_profile = KycProfile.new
  end
 
  def edit
    @_kyc_profile = KycProfile.find(params[:id])
  end
 
  def create
    @_kyc_profile = KycProfile.new(_kyc_profile_params)
 
    if @_kyc_profile.save
      redirect_to _kyc_profiles_path
    else
      render 'new'
    end
  end
 
  def update
    @_kyc_profile = KycProfile.find(params[:id])
 
    if @_kyc_profile.update(_kyc_profile_params)
      redirect_to _kyc_profiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_kyc_profile = KycProfile.find(params[:id])
    @_kyc_profile.destroy
    redirect_to _kyc_profiles_path
  end

 
  private
    def _kyc_profile_params
      params.require(:_kyc_profile).permit(:profileId, :lastReviewedOn, :Status)
    end
end

