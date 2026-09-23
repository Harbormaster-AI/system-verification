
class CreativeAssetsController < ApplicationController
  def index
    @creativeAssets = CreativeAsset.all
  end
 
  def find
    @creativeAsset = CreativeAsset.find(params[:id])
  end
 
  def new
    @creativeAsset = CreativeAsset.new
  end
 
  def edit
    @creativeAsset = CreativeAsset.find(params[:id])
  end
 
  def create
    @creativeAsset = CreativeAsset.new(creativeAsset_params)
 
    if @creativeAsset.save
      redirect_to creativeAssets_path
    else
      render 'new'
    end
  end
 
  def update
    @creativeAsset = CreativeAsset.find(params[:id])
 
    if @creativeAsset.update(creativeAsset_params)
      redirect_to creativeAssets_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @creativeAsset = CreativeAsset.find(params[:id])
    @creativeAsset.destroy
    redirect_to creativeAssets_path
  end

 
  private
    def creativeAsset_params
      params.require(:creativeAsset).permit(:name, :clickUrl, :landingPage, :width, :height, :durationSeconds, :CreativeType, :AdFormat)
    end
end