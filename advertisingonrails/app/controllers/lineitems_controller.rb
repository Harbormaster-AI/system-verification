
class LineItemsController < ApplicationController
  def index
    @lineItems = LineItem.all
  end
 
  def find
    @lineItem = LineItem.find(params[:id])
  end
 
  def new
    @lineItem = LineItem.new
  end
 
  def edit
    @lineItem = LineItem.find(params[:id])
  end
 
  def create
    @lineItem = LineItem.new(lineItem_params)
 
    if @lineItem.save
      redirect_to lineItems_path
    else
      render 'new'
    end
  end
 
  def update
    @lineItem = LineItem.find(params[:id])
 
    if @lineItem.update(lineItem_params)
      redirect_to lineItems_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @lineItem = LineItem.find(params[:id])
    @lineItem.destroy
    redirect_to lineItems_path
  end

 
  private
    def lineItem_params
      params.require(:lineItem).permit(:name, :bidAmount, :dailyBudget, :frequencyCap, :Status, :PricingModel, :BidStrategy, :Pacing)
    end
end