class CabinLayoutsController < ApplicationController
  def index
    @cabin_layouts = CabinLayout.all
  end
 
  def find
    @cabin_layout = CabinLayout.find(params[:id])
  end
 
  def new
    @cabin_layout = CabinLayout.new
  end
 
  def edit
    @cabin_layout = CabinLayout.find(params[:id])
  end
 
  def create
    @cabin_layout = CabinLayout.new(cabin_layout_params)
 
    if @cabin_layout.save
      redirect_to cabin_layouts_path
    else
      render 'new'
    end
  end
 
  def update
    @cabin_layout = CabinLayout.find(params[:id])
 
    if @cabin_layout.update(cabin_layout_params)
      redirect_to cabin_layouts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @cabin_layout = CabinLayout.find(params[:id])
    @cabin_layout.destroy
    redirect_to cabin_layouts_path
  end

 
  private
    def cabin_layout_params
      params.require(:cabin_layout).permit(
        :layout_code,
        :total_seats,
        :class_layout
      )

  end
end