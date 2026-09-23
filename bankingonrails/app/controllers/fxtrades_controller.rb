class FXTradesController < ApplicationController
  def index
    @f_x_trades = FXTrade.all
  end
 
  def find
    @f_x_trade = FXTrade.find(params[:id])
  end
 
  def new
    @f_x_trade = FXTrade.new
  end
 
  def edit
    @f_x_trade = FXTrade.find(params[:id])
  end
 
  def create
    @f_x_trade = FXTrade.new(f_x_trade_params)
 
    if @f_x_trade.save
      redirect_to f_x_trades_path
    else
      render 'new'
    end
  end
 
  def update
    @f_x_trade = FXTrade.find(params[:id])
 
    if @f_x_trade.update(f_x_trade_params)
      redirect_to f_x_trades_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @f_x_trade = FXTrade.find(params[:id])
    @f_x_trade.destroy
    redirect_to f_x_trades_path
  end

 
  private
    def f_x_trade_params
      params.require(:f_x_trade).permit(
        :trade_reference,
        :trade_date,
        :settlement_date,
        :amount_sold,
        :amount_bought,
        :rate,
        :status
      )

  end
end