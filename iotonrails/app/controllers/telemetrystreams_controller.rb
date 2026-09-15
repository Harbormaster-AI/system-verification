
class TelemetryStreamsController < ApplicationController
  def index
    @telemetryStreams = TelemetryStream.all
  end
 
  def show
    @telemetryStream = TelemetryStream.find(params[:id])
  end
 
  def new
    @telemetryStream = TelemetryStream.new
  end
 
  def edit
    @telemetryStream = TelemetryStream.find(params[:id])
  end
 
  def create
    @telemetryStream = TelemetryStream.new(telemetryStream_params)
 
    if @telemetryStream.save
      redirect_to telemetryStreams_path
    else
      render 'new'
    end
  end
 
  def update
    @telemetryStream = TelemetryStream.find(params[:id])
 
    if @telemetryStream.update(telemetryStream_params)
      redirect_to telemetryStreams_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @telemetryStream = TelemetryStream.find(params[:id])
    @telemetryStream.destroy
    redirect_to telemetryStreams_path
  end

 
  private
    def telemetryStream_params
      params.require(:telemetryStream).permit(:streamName, :retentionDays, :Qos)
    end
end