
class TrackingPixelsController < ApplicationController
  def index
    @trackingPixels = TrackingPixel.all
  end
 
  def find
    @trackingPixel = TrackingPixel.find(params[:id])
  end
 
  def new
    @trackingPixel = TrackingPixel.new
  end
 
  def edit
    @trackingPixel = TrackingPixel.find(params[:id])
  end
 
  def create
    @trackingPixel = TrackingPixel.new(trackingPixel_params)
 
    if @trackingPixel.save
      redirect_to trackingPixels_path
    else
      render 'new'
    end
  end
 
  def update
    @trackingPixel = TrackingPixel.find(params[:id])
 
    if @trackingPixel.update(trackingPixel_params)
      redirect_to trackingPixels_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @trackingPixel = TrackingPixel.find(params[:id])
    @trackingPixel.destroy
    redirect_to trackingPixels_path
  end

 
  private
    def trackingPixel_params
      params.require(:trackingPixel).permit(:name, :url, :EventType, :PixelType)
    end
end