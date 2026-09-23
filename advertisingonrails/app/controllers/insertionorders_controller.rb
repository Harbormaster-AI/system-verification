
class InsertionOrdersController < ApplicationController
  def index
    @insertionOrders = InsertionOrder.all
  end
 
  def find
    @insertionOrder = InsertionOrder.find(params[:id])
  end
 
  def new
    @insertionOrder = InsertionOrder.new
  end
 
  def edit
    @insertionOrder = InsertionOrder.find(params[:id])
  end
 
  def create
    @insertionOrder = InsertionOrder.new(insertionOrder_params)
 
    if @insertionOrder.save
      redirect_to insertionOrders_path
    else
      render 'new'
    end
  end
 
  def update
    @insertionOrder = InsertionOrder.find(params[:id])
 
    if @insertionOrder.update(insertionOrder_params)
      redirect_to insertionOrders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @insertionOrder = InsertionOrder.find(params[:id])
    @insertionOrder.destroy
    redirect_to insertionOrders_path
  end

 
  private
    def insertionOrder_params
      params.require(:insertionOrder).permit(:ioNumber, :agreedBudget, :flight, :Status)
    end
end