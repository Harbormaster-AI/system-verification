
class TwinChangeEventsController < ApplicationController
  def index
    @twinChangeEvents = TwinChangeEvent.all
  end
 
  def show
    @twinChangeEvent = TwinChangeEvent.find(params[:id])
  end
 
  def new
    @twinChangeEvent = TwinChangeEvent.new
  end
 
  def edit
    @twinChangeEvent = TwinChangeEvent.find(params[:id])
  end
 
  def create
    @twinChangeEvent = TwinChangeEvent.new(twinChangeEvent_params)
 
    if @twinChangeEvent.save
      redirect_to twinChangeEvents_path
    else
      render 'new'
    end
  end
 
  def update
    @twinChangeEvent = TwinChangeEvent.find(params[:id])
 
    if @twinChangeEvent.update(twinChangeEvent_params)
      redirect_to twinChangeEvents_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @twinChangeEvent = TwinChangeEvent.find(params[:id])
    @twinChangeEvent.destroy
    redirect_to twinChangeEvents_path
  end

 
  private
    def twinChangeEvent_params
      params.require(:twinChangeEvent).permit(:eventId, :occurredAt, :ChangeType)
    end
end