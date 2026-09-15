
class MessagingEndpointsController < ApplicationController
  def index
    @messagingEndpoints = MessagingEndpoint.all
  end
 
  def show
    @messagingEndpoint = MessagingEndpoint.find(params[:id])
  end
 
  def new
    @messagingEndpoint = MessagingEndpoint.new
  end
 
  def edit
    @messagingEndpoint = MessagingEndpoint.find(params[:id])
  end
 
  def create
    @messagingEndpoint = MessagingEndpoint.new(messagingEndpoint_params)
 
    if @messagingEndpoint.save
      redirect_to messagingEndpoints_path
    else
      render 'new'
    end
  end
 
  def update
    @messagingEndpoint = MessagingEndpoint.find(params[:id])
 
    if @messagingEndpoint.update(messagingEndpoint_params)
      redirect_to messagingEndpoints_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @messagingEndpoint = MessagingEndpoint.find(params[:id])
    @messagingEndpoint.destroy
    redirect_to messagingEndpoints_path
  end

 
  private
    def messagingEndpoint_params
      params.require(:messagingEndpoint).permit(:host, :port, :secure, :Protocol)
    end
end