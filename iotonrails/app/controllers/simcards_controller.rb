
class SimCardsController < ApplicationController
  def index
    @simCards = SimCard.all
  end
 
  def show
    @simCard = SimCard.find(params[:id])
  end
 
  def new
    @simCard = SimCard.new
  end
 
  def edit
    @simCard = SimCard.find(params[:id])
  end
 
  def create
    @simCard = SimCard.new(simCard_params)
 
    if @simCard.save
      redirect_to simCards_path
    else
      render 'new'
    end
  end
 
  def update
    @simCard = SimCard.find(params[:id])
 
    if @simCard.update(simCard_params)
      redirect_to simCards_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @simCard = SimCard.find(params[:id])
    @simCard.destroy
    redirect_to simCards_path
  end

 
  private
    def simCard_params
      params.require(:simCard).permit(:iccid, :imsi, :carrier, :Status)
    end
end