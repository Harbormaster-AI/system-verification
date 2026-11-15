class InferenceEndpointsController < ApplicationController
  def index
    @inference_endpoints = InferenceEndpoint.all
  end
 
  def find
    @inference_endpoint = InferenceEndpoint.find(params[:id])
  end
 
  def new
    @inference_endpoint = InferenceEndpoint.new
  end
 
  def edit
    @inference_endpoint = InferenceEndpoint.find(params[:id])
  end
 
  def create
    @inference_endpoint = InferenceEndpoint.new(inference_endpoint_params)
 
    if @inference_endpoint.save
      redirect_to inference_endpoints_path
    else
      render 'new'
    end
  end
 
  def update
    @inference_endpoint = InferenceEndpoint.find(params[:id])
 
    if @inference_endpoint.update(inference_endpoint_params)
      redirect_to inference_endpoints_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @inference_endpoint = InferenceEndpoint.find(params[:id])
    @inference_endpoint.destroy
    redirect_to inference_endpoints_path
  end

 
  private
    def inference_endpoint_params
      params.require(:inference_endpoint).permit(
        :name,
        :endpoint_url,
        :traffic_share,
        :mode
      )

  end
end