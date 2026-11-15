class InventoryItemsController < ApplicationController
  def index
    @inventory_items = InventoryItem.all
  end
 
  def find
    @inventory_item = InventoryItem.find(params[:id])
  end
 
  def new
    @inventory_item = InventoryItem.new
  end
 
  def edit
    @inventory_item = InventoryItem.find(params[:id])
  end
 
  def create
    @inventory_item = InventoryItem.new(inventory_item_params)
 
    if @inventory_item.save
      redirect_to inventory_items_path
    else
      render 'new'
    end
  end
 
  def update
    @inventory_item = InventoryItem.find(params[:id])
 
    if @inventory_item.update(inventory_item_params)
      redirect_to inventory_items_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @inventory_item = InventoryItem.find(params[:id])
    @inventory_item.destroy
    redirect_to inventory_items_path
  end

 
  private
    def inventory_item_params
      params.require(:inventory_item).permit(
        :quantity_on_hand,
        :quantity_reserved,
        :lot_number
      )

  end
end