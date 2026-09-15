
class DigitalTwinsController < ApplicationController
  def index
    @digitalTwins = DigitalTwin.all
  end
 
  def show
    @digitalTwin = DigitalTwin.find(params[:id])
  end
 
  def new
    @digitalTwin = DigitalTwin.new
  end
 
  def edit
    @digitalTwin = DigitalTwin.find(params[:id])
  end
 
  def create
    @digitalTwin = DigitalTwin.new(digitalTwin_params)
 
    if @digitalTwin.save
      redirect_to digitalTwins_path
    else
      render 'new'
    end
  end
 
  def update
    @digitalTwin = DigitalTwin.find(params[:id])
 
    if @digitalTwin.update(digitalTwin_params)
      redirect_to digitalTwins_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @digitalTwin = DigitalTwin.find(params[:id])
    @digitalTwin.destroy
    redirect_to digitalTwins_path
  end

 
  private
    def digitalTwin_params
      params.require(:digitalTwin).permit(:twinId, :desiredStateVersion, :reportedStateVersion, :lastSyncAt)
    end
end