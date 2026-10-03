class KycProfilesController < ApplicationController
  def index
    @kyc_profiles = KycProfile.all
  end

  def find
    @kyc_profile = KycProfile.find(params[:id])
  end

  def new
    @kyc_profile = KycProfile.new
  end

  def edit
    @kyc_profile = KycProfile.find(params[:id])
  end

  def create
    @kyc_profile = KycProfile.new(kyc_profile_params)

    if @kyc_profile.save
      redirect_to kyc_profiles_path
    else
      render "new"
    end
  end

  def update
    @kyc_profile = KycProfile.find(params[:id])

    if @kyc_profile.update(kyc_profile_params)
      redirect_to kyc_profiles_path
    else
      render "edit"
    end
  end

  def destroy
    @kyc_profile = KycProfile.find(params[:id])
    @kyc_profile.destroy
    redirect_to kyc_profiles_path
  end

  private

  def kyc_profile_params
    params.require(:kyc_profile).permit(
      :profile_id,
      :last_reviewed_on,
      :status
    )
  end
end
