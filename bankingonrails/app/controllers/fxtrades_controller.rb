class FXTradesController < ApplicationController
  def index
    @_f_x_trades = FXTrade.all
  end
 
  def find
    @_f_x_trade = FXTrade.find(params[:id])
  end
 
  def new
    @_f_x_trade = FXTrade.new
  end
 
  def edit
    @_f_x_trade = FXTrade.find(params[:id])
  end
 
  def create
    @_f_x_trade = FXTrade.new(_f_x_trade_params)
 
    if @_f_x_trade.save
      redirect_to _f_x_trades_path
    else
      render 'new'
    end
  end
 
  def update
    @_f_x_trade = FXTrade.find(params[:id])
 
    if @_f_x_trade.update(_f_x_trade_params)
      redirect_to _f_x_trades_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_f_x_trade = FXTrade.find(params[:id])
    @_f_x_trade.destroy
    redirect_to _f_x_trades_path
  end

 
  private
    def _f_x_trade_params
      params.require(:_f_x_trade).permit(
        :trade_reference,
        :trade_date,
        :settlement_date,
        :amount_sold,
        :amount_bought,
        :rate,
      )

