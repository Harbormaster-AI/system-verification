
class PlacementsController < ApplicationController
  def index
    @placements = Placement.all
  end
 
  def find
    @placement = Placement.find(params[:id])
  end
 
  def new
    @placement = Placement.new
  end
 
  def edit
    @placement = Placement.find(params[:id])
  end
 
  def create
    @placement = Placement.new(placement_params)
 
    if @placement.save
      redirect_to placements_path
    else
      render 'new'
    end
  end
 
  def update
    @placement = Placement.find(params[:id])
 
    if @placement.update(placement_params)
      redirect_to placements_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @placement = Placement.find(params[:id])
    @placement.destroy
    redirect_to placements_path
  end

 
  private
    def placement_params
      params.require(:placement).permit(:name, :flight, :goalImpressions)
    end
end