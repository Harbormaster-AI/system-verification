
class MaintenanceTicketsController < ApplicationController
  def index
    @maintenanceTickets = MaintenanceTicket.all
  end
 
  def show
    @maintenanceTicket = MaintenanceTicket.find(params[:id])
  end
 
  def new
    @maintenanceTicket = MaintenanceTicket.new
  end
 
  def edit
    @maintenanceTicket = MaintenanceTicket.find(params[:id])
  end
 
  def create
    @maintenanceTicket = MaintenanceTicket.new(maintenanceTicket_params)
 
    if @maintenanceTicket.save
      redirect_to maintenanceTickets_path
    else
      render 'new'
    end
  end
 
  def update
    @maintenanceTicket = MaintenanceTicket.find(params[:id])
 
    if @maintenanceTicket.update(maintenanceTicket_params)
      redirect_to maintenanceTickets_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @maintenanceTicket = MaintenanceTicket.find(params[:id])
    @maintenanceTicket.destroy
    redirect_to maintenanceTickets_path
  end

 
  private
    def maintenanceTicket_params
      params.require(:maintenanceTicket).permit(:ticketNumber, :openedAt, :closedAt, :Priority, :Status)
    end
end