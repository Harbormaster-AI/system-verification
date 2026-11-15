class MaintenanceAppointmentsController < ApplicationController
  def index
    @maintenance_appointments = MaintenanceAppointment.all
  end
 
  def find
    @maintenance_appointment = MaintenanceAppointment.find(params[:id])
  end
 
  def new
    @maintenance_appointment = MaintenanceAppointment.new
  end
 
  def edit
    @maintenance_appointment = MaintenanceAppointment.find(params[:id])
  end
 
  def create
    @maintenance_appointment = MaintenanceAppointment.new(maintenance_appointment_params)
 
    if @maintenance_appointment.save
      redirect_to maintenance_appointments_path
    else
      render 'new'
    end
  end
 
  def update
    @maintenance_appointment = MaintenanceAppointment.find(params[:id])
 
    if @maintenance_appointment.update(maintenance_appointment_params)
      redirect_to maintenance_appointments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @maintenance_appointment = MaintenanceAppointment.find(params[:id])
    @maintenance_appointment.destroy
    redirect_to maintenance_appointments_path
  end

 
  private
    def maintenance_appointment_params
      params.require(:maintenance_appointment).permit(
        :appointment_date,
        :status
      )

  end
end