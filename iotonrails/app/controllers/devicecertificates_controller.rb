
class DeviceCertificatesController < ApplicationController
  def index
    @deviceCertificates = DeviceCertificate.all
  end
 
  def show
    @deviceCertificate = DeviceCertificate.find(params[:id])
  end
 
  def new
    @deviceCertificate = DeviceCertificate.new
  end
 
  def edit
    @deviceCertificate = DeviceCertificate.find(params[:id])
  end
 
  def create
    @deviceCertificate = DeviceCertificate.new(deviceCertificate_params)
 
    if @deviceCertificate.save
      redirect_to deviceCertificates_path
    else
      render 'new'
    end
  end
 
  def update
    @deviceCertificate = DeviceCertificate.find(params[:id])
 
    if @deviceCertificate.update(deviceCertificate_params)
      redirect_to deviceCertificates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deviceCertificate = DeviceCertificate.find(params[:id])
    @deviceCertificate.destroy
    redirect_to deviceCertificates_path
  end

 
  private
    def deviceCertificate_params
      params.require(:deviceCertificate).permit(:serialNumber, :notBefore, :notAfter, :fingerprint, :CertificateType)
    end
end