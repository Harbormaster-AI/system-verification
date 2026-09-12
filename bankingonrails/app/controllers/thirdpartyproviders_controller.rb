class ThirdPartyProvidersController < ApplicationController
  def index
    @thirdPartyProviders = ThirdPartyProvider.all
  end
 
  def show
    @thirdPartyProvider = ThirdPartyProvider.find(params[:id])
  end
 
  def new
    @thirdPartyProvider = ThirdPartyProvider.new
  end
 
  def edit
    @thirdPartyProvider = ThirdPartyProvider.find(params[:id])
  end
 
  def create
    @thirdPartyProvider = ThirdPartyProvider.new(thirdPartyProvider_params)
 
    if @thirdPartyProvider.save
      redirect_to thirdPartyProviders_path
    else
      render 'new'
    end
  end
 
  def update
    @thirdPartyProvider = ThirdPartyProvider.find(params[:id])
 
    if @thirdPartyProvider.update(thirdPartyProvider_params)
      redirect_to thirdPartyProviders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @thirdPartyProvider = ThirdPartyProvider.find(params[:id])
    @thirdPartyProvider.destroy
    redirect_to thirdPartyProviders_path
  end

 
  private
    def thirdPartyProvider_params
      params.require(:thirdPartyProvider).permit(:name, :registrationId, :website)
    end
end