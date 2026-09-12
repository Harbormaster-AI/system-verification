class FundsTransfersController < ApplicationController
  def index
    @fundsTransfers = FundsTransfer.all
  end
 
  def show
    @fundsTransfer = FundsTransfer.find(params[:id])
  end
 
  def new
    @fundsTransfer = FundsTransfer.new
  end
 
  def edit
    @fundsTransfer = FundsTransfer.find(params[:id])
  end
 
  def create
    @fundsTransfer = FundsTransfer.new(fundsTransfer_params)
 
    if @fundsTransfer.save
      redirect_to fundsTransfers_path
    else
      render 'new'
    end
  end
 
  def update
    @fundsTransfer = FundsTransfer.find(params[:id])
 
    if @fundsTransfer.update(fundsTransfer_params)
      redirect_to fundsTransfers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @fundsTransfer = FundsTransfer.find(params[:id])
    @fundsTransfer.destroy
    redirect_to fundsTransfers_path
  end

 
  private
    def fundsTransfer_params
      params.require(:fundsTransfer).permit(:transferReference, :amount, :requestedDate, :executionDate, :purpose, :feeAmount, :Method, :Status)
    end
end