
class ConsentsController < ApplicationController
  def index
    @_consents = Consent.all
  end
 
  def find
    @_consent = Consent.find(params[:id])
  end
 
  def new
    @_consent = Consent.new
  end
 
  def edit
    @_consent = Consent.find(params[:id])
  end
 
  def create
    @_consent = Consent.new(_consent_params)
 
    if @_consent.save
      redirect_to _consents_path
    else
      render 'new'
    end
  end
 
  def update
    @_consent = Consent.find(params[:id])
 
    if @_consent.update(_consent_params)
      redirect_to _consents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_consent = Consent.find(params[:id])
    @_consent.destroy
    redirect_to _consents_path
  end

 
  private
    def _consent_params
      params.require(:_consent).permit(:grantedOn, :expiresOn, :ConsentType, :Status)
    end
end