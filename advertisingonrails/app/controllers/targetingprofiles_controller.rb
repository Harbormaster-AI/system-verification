
class TargetingProfilesController < ApplicationController
  def index
    @targetingProfiles = TargetingProfile.all
  end
 
  def find
    @targetingProfile = TargetingProfile.find(params[:id])
  end
 
  def new
    @targetingProfile = TargetingProfile.new
  end
 
  def edit
    @targetingProfile = TargetingProfile.find(params[:id])
  end
 
  def create
    @targetingProfile = TargetingProfile.new(targetingProfile_params)
 
    if @targetingProfile.save
      redirect_to targetingProfiles_path
    else
      render 'new'
    end
  end
 
  def update
    @targetingProfile = TargetingProfile.find(params[:id])
 
    if @targetingProfile.update(targetingProfile_params)
      redirect_to targetingProfiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @targetingProfile = TargetingProfile.find(params[:id])
    @targetingProfile.destroy
    redirect_to targetingProfiles_path
  end

 
  private
    def targetingProfile_params
      params.require(:targetingProfile).permit(:name)
    end
end