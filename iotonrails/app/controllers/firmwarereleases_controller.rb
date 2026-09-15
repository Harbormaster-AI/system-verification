
class FirmwareReleasesController < ApplicationController
  def index
    @firmwareReleases = FirmwareRelease.all
  end
 
  def show
    @firmwareRelease = FirmwareRelease.find(params[:id])
  end
 
  def new
    @firmwareRelease = FirmwareRelease.new
  end
 
  def edit
    @firmwareRelease = FirmwareRelease.find(params[:id])
  end
 
  def create
    @firmwareRelease = FirmwareRelease.new(firmwareRelease_params)
 
    if @firmwareRelease.save
      redirect_to firmwareReleases_path
    else
      render 'new'
    end
  end
 
  def update
    @firmwareRelease = FirmwareRelease.find(params[:id])
 
    if @firmwareRelease.update(firmwareRelease_params)
      redirect_to firmwareReleases_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @firmwareRelease = FirmwareRelease.find(params[:id])
    @firmwareRelease.destroy
    redirect_to firmwareReleases_path
  end

 
  private
    def firmwareRelease_params
      params.require(:firmwareRelease).permit(:version, :releaseDate, :releaseNotes, :checksum)
    end
end