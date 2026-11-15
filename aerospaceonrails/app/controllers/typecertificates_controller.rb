class TypeCertificatesController < ApplicationController
  def index
    @type_certificates = TypeCertificate.all
  end
 
  def find
    @type_certificate = TypeCertificate.find(params[:id])
  end
 
  def new
    @type_certificate = TypeCertificate.new
  end
 
  def edit
    @type_certificate = TypeCertificate.find(params[:id])
  end
 
  def create
    @type_certificate = TypeCertificate.new(type_certificate_params)
 
    if @type_certificate.save
      redirect_to type_certificates_path
    else
      render 'new'
    end
  end
 
  def update
    @type_certificate = TypeCertificate.find(params[:id])
 
    if @type_certificate.update(type_certificate_params)
      redirect_to type_certificates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @type_certificate = TypeCertificate.find(params[:id])
    @type_certificate.destroy
    redirect_to type_certificates_path
  end

 
  private
    def type_certificate_params
      params.require(:type_certificate).permit(
        :certificate_number,
        :authority
      )

  end
end