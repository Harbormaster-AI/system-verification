
class RateCardsController < ApplicationController
  def index
    @rateCards = RateCard.all
  end
 
  def find
    @rateCard = RateCard.find(params[:id])
  end
 
  def new
    @rateCard = RateCard.new
  end
 
  def edit
    @rateCard = RateCard.find(params[:id])
  end
 
  def create
    @rateCard = RateCard.new(rateCard_params)
 
    if @rateCard.save
      redirect_to rateCards_path
    else
      render 'new'
    end
  end
 
  def update
    @rateCard = RateCard.find(params[:id])
 
    if @rateCard.update(rateCard_params)
      redirect_to rateCards_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @rateCard = RateCard.find(params[:id])
    @rateCard.destroy
    redirect_to rateCards_path
  end

 
  private
    def rateCard_params
      params.require(:rateCard).permit(:name, :effectiveDate, :currency)
    end
end