
class IdentityDocumentsController < ApplicationController
  def index
    @_identity_documents = IdentityDocument.all
  end
 
  def find
    @_identity_document = IdentityDocument.find(params[:id])
  end
 
  def new
    @_identity_document = IdentityDocument.new
  end
 
  def edit
    @_identity_document = IdentityDocument.find(params[:id])
  end
 
  def create
    @_identity_document = IdentityDocument.new(_identity_document_params)
 
    if @_identity_document.save
      redirect_to _identity_documents_path
    else
      render 'new'
    end
  end
 
  def update
    @_identity_document = IdentityDocument.find(params[:id])
 
    if @_identity_document.update(_identity_document_params)
      redirect_to _identity_documents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_identity_document = IdentityDocument.find(params[:id])
    @_identity_document.destroy
    redirect_to _identity_documents_path
  end

 
  private
    def _identity_document_params
      params.require(:_identity_document).permit(:documentNumber, :issuingCountry, :expirationDate, :DocumentType)
    end
end