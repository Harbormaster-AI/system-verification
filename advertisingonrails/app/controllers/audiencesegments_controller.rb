
class AudienceSegmentsController < ApplicationController
  def index
    @audienceSegments = AudienceSegment.all
  end
 
  def find
    @audienceSegment = AudienceSegment.find(params[:id])
  end
 
  def new
    @audienceSegment = AudienceSegment.new
  end
 
  def edit
    @audienceSegment = AudienceSegment.find(params[:id])
  end
 
  def create
    @audienceSegment = AudienceSegment.new(audienceSegment_params)
 
    if @audienceSegment.save
      redirect_to audienceSegments_path
    else
      render 'new'
    end
  end
 
  def update
    @audienceSegment = AudienceSegment.find(params[:id])
 
    if @audienceSegment.update(audienceSegment_params)
      redirect_to audienceSegments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @audienceSegment = AudienceSegment.find(params[:id])
    @audienceSegment.destroy
    redirect_to audienceSegments_path
  end

 
  private
    def audienceSegment_params
      params.require(:audienceSegment).permit(:name, :estimatedReach, :description, :ProviderType)
    end
end