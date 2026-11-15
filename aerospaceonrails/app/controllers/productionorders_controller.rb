class ProductionOrdersController < ApplicationController
  def index
    @production_orders = ProductionOrder.all
  end
 
  def find
    @production_order = ProductionOrder.find(params[:id])
  end
 
  def new
    @production_order = ProductionOrder.new
  end
 
  def edit
    @production_order = ProductionOrder.find(params[:id])
  end
 
  def create
    @production_order = ProductionOrder.new(production_order_params)
 
    if @production_order.save
      redirect_to production_orders_path
    else
      render 'new'
    end
  end
 
  def update
    @production_order = ProductionOrder.find(params[:id])
 
    if @production_order.update(production_order_params)
      redirect_to production_orders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @production_order = ProductionOrder.find(params[:id])
    @production_order.destroy
    redirect_to production_orders_path
  end

 
  private
    def production_order_params
      params.require(:production_order).permit(
        :order_number,
        :status
      )

  end
end