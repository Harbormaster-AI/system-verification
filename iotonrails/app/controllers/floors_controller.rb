
class FloorsController < ApplicationController
  def index
    @floors = Floor.all
  end
 
  def show
    @floor = Floor.find(params[:id])
  end
 
  def new
    @floor = Floor.new
  end
 
  def edit
    @floor = Floor.find(params[:id])
  end
 
  def create
    @floor = Floor.new(floor_params)
 
    if @floor.save
      redirect_to floors_path
    else
      render 'new'
    end
  end
 
  def update
    @floor = Floor.find(params[:id])
 
    if @floor.update(floor_params)
      redirect_to floors_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @floor = Floor.find(params[:id])
    @floor.destroy
    redirect_to floors_path
  end

 
  private
    def floor_params
      params.require(:floor).permit(:name, :level)
    end
end