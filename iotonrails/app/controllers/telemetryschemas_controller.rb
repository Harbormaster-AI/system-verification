
class TelemetrySchemasController < ApplicationController
  def index
    @telemetrySchemas = TelemetrySchema.all
  end
 
  def show
    @telemetrySchema = TelemetrySchema.find(params[:id])
  end
 
  def new
    @telemetrySchema = TelemetrySchema.new
  end
 
  def edit
    @telemetrySchema = TelemetrySchema.find(params[:id])
  end
 
  def create
    @telemetrySchema = TelemetrySchema.new(telemetrySchema_params)
 
    if @telemetrySchema.save
      redirect_to telemetrySchemas_path
    else
      render 'new'
    end
  end
 
  def update
    @telemetrySchema = TelemetrySchema.find(params[:id])
 
    if @telemetrySchema.update(telemetrySchema_params)
      redirect_to telemetrySchemas_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @telemetrySchema = TelemetrySchema.find(params[:id])
    @telemetrySchema.destroy
    redirect_to telemetrySchemas_path
  end

 
  private
    def telemetrySchema_params
      params.require(:telemetrySchema).permit(:schemaId, :schemaUri, :Encoding)
    end
end