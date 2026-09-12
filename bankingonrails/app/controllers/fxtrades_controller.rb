class FXTradesController < ApplicationController
  def index
    @fXTrades = FXTrade.all
  end
 
  def show
    @fXTrade = FXTrade.find(params[:id])
  end
 
  def new
    @fXTrade = FXTrade.new
  end
 
  def edit
    @fXTrade = FXTrade.find(params[:id])
  end
 
  def create
    @fXTrade = FXTrade.new(fXTrade_params)
 
    if @fXTrade.save
      redirect_to fXTrades_path
    else
      render 'new'
    end
  end
 
  def update
    @fXTrade = FXTrade.find(params[:id])
 
    if @fXTrade.update(fXTrade_params)
      redirect_to fXTrades_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @fXTrade = FXTrade.find(params[:id])
    @fXTrade.destroy
    redirect_to fXTrades_path
  end

 
  private
    def fXTrade_params
      params.require(:fXTrade).permit(:tradeReference, :tradeDate, :settlementDate, :amountSold, :amountBought, :rate, :Status)
    end
end