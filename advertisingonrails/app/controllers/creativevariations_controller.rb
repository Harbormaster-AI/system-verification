
class CreativeVariationsController < ApplicationController
  def index
    @creativeVariations = CreativeVariation.all
  end
 
  def find
    @creativeVariation = CreativeVariation.find(params[:id])
  end
 
  def new
    @creativeVariation = CreativeVariation.new
  end
 
  def edit
    @creativeVariation = CreativeVariation.find(params[:id])
  end
 
  def create
    @creativeVariation = CreativeVariation.new(creativeVariation_params)
 
    if @creativeVariation.save
      redirect_to creativeVariations_path
    else
      render 'new'
    end
  end
 
  def update
    @creativeVariation = CreativeVariation.find(params[:id])
 
    if @creativeVariation.update(creativeVariation_params)
      redirect_to creativeVariations_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @creativeVariation = CreativeVariation.find(params[:id])
    @creativeVariation.destroy
    redirect_to creativeVariations_path
  end

 
  private
    def creativeVariation_params
      params.require(:creativeVariation).permit(:name, :language, :headline, :bodyText, :callToAction)
    end
end