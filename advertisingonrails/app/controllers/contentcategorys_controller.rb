
class ContentCategorysController < ApplicationController
  def index
    @contentCategorys = ContentCategory.all
  end
 
  def find
    @contentCategory = ContentCategory.find(params[:id])
  end
 
  def new
    @contentCategory = ContentCategory.new
  end
 
  def edit
    @contentCategory = ContentCategory.find(params[:id])
  end
 
  def create
    @contentCategory = ContentCategory.new(contentCategory_params)
 
    if @contentCategory.save
      redirect_to contentCategorys_path
    else
      render 'new'
    end
  end
 
  def update
    @contentCategory = ContentCategory.find(params[:id])
 
    if @contentCategory.update(contentCategory_params)
      redirect_to contentCategorys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @contentCategory = ContentCategory.find(params[:id])
    @contentCategory.destroy
    redirect_to contentCategorys_path
  end

 
  private
    def contentCategory_params
      params.require(:contentCategory).permit(:code, :name)
    end
end