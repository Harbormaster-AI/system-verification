class FlightHealthEventsController < ApplicationController
  def index
    @flight_health_events = FlightHealthEvent.all
  end
 
  def find
    @flight_health_event = FlightHealthEvent.find(params[:id])
  end
 
  def new
    @flight_health_event = FlightHealthEvent.new
  end
 
  def edit
    @flight_health_event = FlightHealthEvent.find(params[:id])
  end
 
  def create
    @flight_health_event = FlightHealthEvent.new(flight_health_event_params)
 
    if @flight_health_event.save
      redirect_to flight_health_events_path
    else
      render 'new'
    end
  end
 
  def update
    @flight_health_event = FlightHealthEvent.find(params[:id])
 
    if @flight_health_event.update(flight_health_event_params)
      redirect_to flight_health_events_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @flight_health_event = FlightHealthEvent.find(params[:id])
    @flight_health_event.destroy
    redirect_to flight_health_events_path
  end

 
  private
    def flight_health_event_params
      params.require(:flight_health_event).permit(
        :event_code,
        :severity
      )

  end
end