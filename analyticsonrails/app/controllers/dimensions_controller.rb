class DimensionsController < ApplicationController
  def index
    @dimensions = Dimension.all
  end
 
  def find
    @dimension = Dimension.find(params[:id])
  end
 
  def new
    @dimension = Dimension.new
  end
 
  def edit
    @dimension = Dimension.find(params[:id])
  end
 
  def create
    @dimension = Dimension.new(dimension_params)
 
    if @dimension.save
      redirect_to dimensions_path
    else
      render 'new'
    end
  end
 
  def update
    @dimension = Dimension.find(params[:id])
 
    if @dimension.update(dimension_params)
      redirect_to dimensions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dimension = Dimension.find(params[:id])
    @dimension.destroy
    redirect_to dimensions_path
  end

 
  private
    def dimension_params
      params.require(:dimension).permit(
        :name,
        :type_time,
        :dimension_type
      )

  end
end