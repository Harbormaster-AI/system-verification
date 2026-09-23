class ThirdPartyProvidersController < ApplicationController
  def index
    @_third_party_providers = ThirdPartyProvider.all
  end
 
  def find
    @_third_party_provider = ThirdPartyProvider.find(params[:id])
  end
 
  def new
    @_third_party_provider = ThirdPartyProvider.new
  end
 
  def edit
    @_third_party_provider = ThirdPartyProvider.find(params[:id])
  end
 
  def create
    @_third_party_provider = ThirdPartyProvider.new(_third_party_provider_params)
 
    if @_third_party_provider.save
      redirect_to _third_party_providers_path
    else
      render 'new'
    end
  end
 
  def update
    @_third_party_provider = ThirdPartyProvider.find(params[:id])
 
    if @_third_party_provider.update(_third_party_provider_params)
      redirect_to _third_party_providers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_third_party_provider = ThirdPartyProvider.find(params[:id])
    @_third_party_provider.destroy
    redirect_to _third_party_providers_path
  end

 
  private
    def _third_party_provider_params
      params.require(:_third_party_provider).permit(:name,\n\t\t\t :registrationId,\n\t\t\t :website)
    end
end

