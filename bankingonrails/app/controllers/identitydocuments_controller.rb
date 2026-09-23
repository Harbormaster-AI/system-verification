class IdentityDocumentsController < ApplicationController
  def index
    @identity_documents = IdentityDocument.all
  end
 
  def find
    @identity_document = IdentityDocument.find(params[:id])
  end
 
  def new
    @identity_document = IdentityDocument.new
  end
 
  def edit
    @identity_document = IdentityDocument.find(params[:id])
  end
 
  def create
    @identity_document = IdentityDocument.new(identity_document_params)
 
    if @identity_document.save
      redirect_to identity_documents_path
    else
      render 'new'
    end
  end
 
  def update
    @identity_document = IdentityDocument.find(params[:id])
 
    if @identity_document.update(identity_document_params)
      redirect_to identity_documents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @identity_document = IdentityDocument.find(params[:id])
    @identity_document.destroy
    redirect_to identity_documents_path
  end

 
  private
    def identity_document_params
      params.require(:identity_document).permit(
        :document_number,
        :issuing_country,
        :expiration_date,
        :document_type
      )

