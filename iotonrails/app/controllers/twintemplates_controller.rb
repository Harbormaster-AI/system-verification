
class TwinTemplatesController < ApplicationController
  def index
    @twinTemplates = TwinTemplate.all
  end
 
  def show
    @twinTemplate = TwinTemplate.find(params[:id])
  end
 
  def new
    @twinTemplate = TwinTemplate.new
  end
 
  def edit
    @twinTemplate = TwinTemplate.find(params[:id])
  end
 
  def create
    @twinTemplate = TwinTemplate.new(twinTemplate_params)
 
    if @twinTemplate.save
      redirect_to twinTemplates_path
    else
      render 'new'
    end
  end
 
  def update
    @twinTemplate = TwinTemplate.find(params[:id])
 
    if @twinTemplate.update(twinTemplate_params)
      redirect_to twinTemplates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @twinTemplate = TwinTemplate.find(params[:id])
    @twinTemplate.destroy
    redirect_to twinTemplates_path
  end

 
  private
    def twinTemplate_params
      params.require(:twinTemplate).permit(:name, :schemaUri, :version)
    end
end