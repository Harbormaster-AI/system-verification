class IdentityDocumentsController < ApplicationController
  def index
    @identityDocuments = IdentityDocument.all
  end
 
  def show
    @identityDocument = IdentityDocument.find(params[:id])
  end
 
  def new
    @identityDocument = IdentityDocument.new
  end
 
  def edit
    @identityDocument = IdentityDocument.find(params[:id])
  end
 
  def create
    @identityDocument = IdentityDocument.new(identityDocument_params)
 
    if @identityDocument.save
      redirect_to identityDocuments_path
    else
      render 'new'
    end
  end
 
  def update
    @identityDocument = IdentityDocument.find(params[:id])
 
    if @identityDocument.update(identityDocument_params)
      redirect_to identityDocuments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @identityDocument = IdentityDocument.find(params[:id])
    @identityDocument.destroy
    redirect_to identityDocuments_path
  end

 
  private
    def identityDocument_params
      params.require(:identityDocument).permit(:documentNumber, :issuingCountry, :expirationDate, :DocumentType)
    end
end