
class RatesController < ApplicationController
  def index
    @rates = Rate.all
  end
 
  def find
    @rate = Rate.find(params[:id])
  end
 
  def new
    @rate = Rate.new
  end
 
  def edit
    @rate = Rate.find(params[:id])
  end
 
  def create
    @rate = Rate.new(rate_params)
 
    if @rate.save
      redirect_to rates_path
    else
      render 'new'
    end
  end
 
  def update
    @rate = Rate.find(params[:id])
 
    if @rate.update(rate_params)
      redirect_to rates_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @rate = Rate.find(params[:id])
    @rate.destroy
    redirect_to rates_path
  end

 
  private
    def rate_params
      params.require(:rate).permit(:unitPrice, :AdFormat, :PricingModel)
    end
end