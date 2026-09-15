
class ApiKeysController < ApplicationController
  def index
    @apiKeys = ApiKey.all
  end
 
  def show
    @apiKey = ApiKey.find(params[:id])
  end
 
  def new
    @apiKey = ApiKey.new
  end
 
  def edit
    @apiKey = ApiKey.find(params[:id])
  end
 
  def create
    @apiKey = ApiKey.new(apiKey_params)
 
    if @apiKey.save
      redirect_to apiKeys_path
    else
      render 'new'
    end
  end
 
  def update
    @apiKey = ApiKey.find(params[:id])
 
    if @apiKey.update(apiKey_params)
      redirect_to apiKeys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @apiKey = ApiKey.find(params[:id])
    @apiKey.destroy
    redirect_to apiKeys_path
  end

 
  private
    def apiKey_params
      params.require(:apiKey).permit(:keyId, :hashedSecret, :createdAt, :lastUsedAt)
    end
end