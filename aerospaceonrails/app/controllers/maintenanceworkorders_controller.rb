class MaintenanceWorkOrdersController < ApplicationController
  def index
    @maintenance_work_orders = MaintenanceWorkOrder.all
  end
 
  def find
    @maintenance_work_order = MaintenanceWorkOrder.find(params[:id])
  end
 
  def new
    @maintenance_work_order = MaintenanceWorkOrder.new
  end
 
  def edit
    @maintenance_work_order = MaintenanceWorkOrder.find(params[:id])
  end
 
  def create
    @maintenance_work_order = MaintenanceWorkOrder.new(maintenance_work_order_params)
 
    if @maintenance_work_order.save
      redirect_to maintenance_work_orders_path
    else
      render 'new'
    end
  end
 
  def update
    @maintenance_work_order = MaintenanceWorkOrder.find(params[:id])
 
    if @maintenance_work_order.update(maintenance_work_order_params)
      redirect_to maintenance_work_orders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @maintenance_work_order = MaintenanceWorkOrder.find(params[:id])
    @maintenance_work_order.destroy
    redirect_to maintenance_work_orders_path
  end

 
  private
    def maintenance_work_order_params
      params.require(:maintenance_work_order).permit(
        :work_order_number,
        :status
      )

  end
end