class AircraftOrdersController < ApplicationController
  def index
    @aircraft_orders = AircraftOrder.all
  end
 
  def find
    @aircraft_order = AircraftOrder.find(params[:id])
  end
 
  def new
    @aircraft_order = AircraftOrder.new
  end
 
  def edit
    @aircraft_order = AircraftOrder.find(params[:id])
  end
 
  def create
    @aircraft_order = AircraftOrder.new(aircraft_order_params)
 
    if @aircraft_order.save
      redirect_to aircraft_orders_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_order = AircraftOrder.find(params[:id])
 
    if @aircraft_order.update(aircraft_order_params)
      redirect_to aircraft_orders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_order = AircraftOrder.find(params[:id])
    @aircraft_order.destroy
    redirect_to aircraft_orders_path
  end

 
  private
    def aircraft_order_params
      params.require(:aircraft_order).permit(
        :order_number,
        :total_amount,
        :status
      )

  end
end