
class InventorySourcesController < ApplicationController
  def index
    @inventorySources = InventorySource.all
  end
 
  def find
    @inventorySource = InventorySource.find(params[:id])
  end
 
  def new
    @inventorySource = InventorySource.new
  end
 
  def edit
    @inventorySource = InventorySource.find(params[:id])
  end
 
  def create
    @inventorySource = InventorySource.new(inventorySource_params)
 
    if @inventorySource.save
      redirect_to inventorySources_path
    else
      render 'new'
    end
  end
 
  def update
    @inventorySource = InventorySource.find(params[:id])
 
    if @inventorySource.update(inventorySource_params)
      redirect_to inventorySources_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @inventorySource = InventorySource.find(params[:id])
    @inventorySource.destroy
    redirect_to inventorySources_path
  end

 
  private
    def inventorySource_params
      params.require(:inventorySource).permit(:name, :domain, :Channel, :PrimaryFormat)
    end
end