class PlantsController < ApplicationController
  def index
    @plants = Plant.all
  end
 
  def find
    @plant = Plant.find(params[:id])
  end
 
  def new
    @plant = Plant.new
  end
 
  def edit
    @plant = Plant.find(params[:id])
  end
 
  def create
    @plant = Plant.new(plant_params)
 
    if @plant.save
      redirect_to plants_path
    else
      render 'new'
    end
  end
 
  def update
    @plant = Plant.find(params[:id])
 
    if @plant.update(plant_params)
      redirect_to plants_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @plant = Plant.find(params[:id])
    @plant.destroy
    redirect_to plants_path
  end

 
  private
    def plant_params
      params.require(:plant).permit(
        :name,
        :plant_code,
        :address
      )

  end
end