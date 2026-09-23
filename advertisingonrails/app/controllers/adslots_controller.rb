
class AdSlotsController < ApplicationController
  def index
    @adSlots = AdSlot.all
  end
 
  def find
    @adSlot = AdSlot.find(params[:id])
  end
 
  def new
    @adSlot = AdSlot.new
  end
 
  def edit
    @adSlot = AdSlot.find(params[:id])
  end
 
  def create
    @adSlot = AdSlot.new(adSlot_params)
 
    if @adSlot.save
      redirect_to adSlots_path
    else
      render 'new'
    end
  end
 
  def update
    @adSlot = AdSlot.find(params[:id])
 
    if @adSlot.update(adSlot_params)
      redirect_to adSlots_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @adSlot = AdSlot.find(params[:id])
    @adSlot.destroy
    redirect_to adSlots_path
  end

 
  private
    def adSlot_params
      params.require(:adSlot).permit(:slotCode, :width, :height, :floorPrice, :Format)
    end
end