class ThirdPartyProvidersController < ApplicationController
  def index
    @third_party_providers = ThirdPartyProvider.all
  end
 
  def find
    @third_party_provider = ThirdPartyProvider.find(params[:id])
  end
 
  def new
    @third_party_provider = ThirdPartyProvider.new
  end
 
  def edit
    @third_party_provider = ThirdPartyProvider.find(params[:id])
  end
 
  def create
    @third_party_provider = ThirdPartyProvider.new(third_party_provider_params)
 
    if @third_party_provider.save
      redirect_to third_party_providers_path
    else
      render 'new'
    end
  end
 
  def update
    @third_party_provider = ThirdPartyProvider.find(params[:id])
 
    if @third_party_provider.update(third_party_provider_params)
      redirect_to third_party_providers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @third_party_provider = ThirdPartyProvider.find(params[:id])
    @third_party_provider.destroy
    redirect_to third_party_providers_path
  end

 
  private
    def third_party_provider_params
      params.require(:third_party_provider).permit(
        :name,
        :registration_id,
        :website
      )

