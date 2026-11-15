class ProductionCertificatesController < ApplicationController
  def index
    @production_certificates = ProductionCertificate.all
  end
 
  def find
    @production_certificate = ProductionCertificate.find(params[:id])
  end
 
  def new
    @production_certificate = ProductionCertificate.new
  end
 
  def edit
    @production_certificate = ProductionCertificate.find(params[:id])
  end
 
  def create
    @production_certificate = ProductionCertificate.new(production_certificate_params)
 
    if @production_certificate.save
      redirect_to production_certificates_path
    else
      render 'new'
    end
  end
 
  def update
    @production_certificate = ProductionCertificate.find(params[:id])
 
    if @production_certificate.update(production_certificate_params)
      redirect_to production_certificates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @production_certificate = ProductionCertificate.find(params[:id])
    @production_certificate.destroy
    redirect_to production_certificates_path
  end

 
  private
    def production_certificate_params
      params.require(:production_certificate).permit(
        :certificate_number,
        :authority
      )

  end
end