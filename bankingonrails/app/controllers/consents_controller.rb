class ConsentsController < ApplicationController
  def index
    @consents = Consent.all
  end
 
  def show
    @consent = Consent.find(params[:id])
  end
 
  def new
    @consent = Consent.new
  end
 
  def edit
    @consent = Consent.find(params[:id])
  end
 
  def create
    @consent = Consent.new(consent_params)
 
    if @consent.save
      redirect_to consents_path
    else
      render 'new'
    end
  end
 
  def update
    @consent = Consent.find(params[:id])
 
    if @consent.update(consent_params)
      redirect_to consents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @consent = Consent.find(params[:id])
    @consent.destroy
    redirect_to consents_path
  end

 
  private
    def consent_params
      params.require(:consent).permit(:grantedOn, :expiresOn, :ConsentType, :Status)
    end
end