
class DealsController < ApplicationController
  def index
    @deals = Deal.all
  end
 
  def find
    @deal = Deal.find(params[:id])
  end
 
  def new
    @deal = Deal.new
  end
 
  def edit
    @deal = Deal.find(params[:id])
  end
 
  def create
    @deal = Deal.new(deal_params)
 
    if @deal.save
      redirect_to deals_path
    else
      render 'new'
    end
  end
 
  def update
    @deal = Deal.find(params[:id])
 
    if @deal.update(deal_params)
      redirect_to deals_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @deal = Deal.find(params[:id])
    @deal.destroy
    redirect_to deals_path
  end

 
  private
    def deal_params
      params.require(:deal).permit(:floorPrice, :DealType)
    end
end