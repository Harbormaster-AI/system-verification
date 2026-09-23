
class ConversionEventsController < ApplicationController
  def index
    @conversionEvents = ConversionEvent.all
  end
 
  def find
    @conversionEvent = ConversionEvent.find(params[:id])
  end
 
  def new
    @conversionEvent = ConversionEvent.new
  end
 
  def edit
    @conversionEvent = ConversionEvent.find(params[:id])
  end
 
  def create
    @conversionEvent = ConversionEvent.new(conversionEvent_params)
 
    if @conversionEvent.save
      redirect_to conversionEvents_path
    else
      render 'new'
    end
  end
 
  def update
    @conversionEvent = ConversionEvent.find(params[:id])
 
    if @conversionEvent.update(conversionEvent_params)
      redirect_to conversionEvents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @conversionEvent = ConversionEvent.find(params[:id])
    @conversionEvent.destroy
    redirect_to conversionEvents_path
  end

 
  private
    def conversionEvent_params
      params.require(:conversionEvent).permit(:timestamp, :value, :EventType, :AttributionModel)
    end
end