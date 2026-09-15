
class GatewaysController < ApplicationController
  def index
    @gateways = Gateway.all
  end
 
  def show
    @gateway = Gateway.find(params[:id])
  end
 
  def new
    @gateway = Gateway.new
  end
 
  def edit
    @gateway = Gateway.find(params[:id])
  end
 
  def create
    @gateway = Gateway.new(gateway_params)
 
    if @gateway.save
      redirect_to gateways_path
    else
      render 'new'
    end
  end
 
  def update
    @gateway = Gateway.find(params[:id])
 
    if @gateway.update(gateway_params)
      redirect_to gateways_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @gateway = Gateway.find(params[:id])
    @gateway.destroy
    redirect_to gateways_path
  end

 
  private
    def gateway_params
      params.require(:gateway).permit(:softwareVersion, :Status)
    end
end