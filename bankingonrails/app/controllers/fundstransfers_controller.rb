class FundsTransfersController < ApplicationController
  def index
    @funds_transfers = FundsTransfer.all
  end
 
  def find
    @funds_transfer = FundsTransfer.find(params[:id])
  end
 
  def new
    @funds_transfer = FundsTransfer.new
  end
 
  def edit
    @funds_transfer = FundsTransfer.find(params[:id])
  end
 
  def create
    @funds_transfer = FundsTransfer.new(funds_transfer_params)
 
    if @funds_transfer.save
      redirect_to funds_transfers_path
    else
      render 'new'
    end
  end
 
  def update
    @funds_transfer = FundsTransfer.find(params[:id])
 
    if @funds_transfer.update(funds_transfer_params)
      redirect_to funds_transfers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @funds_transfer = FundsTransfer.find(params[:id])
    @funds_transfer.destroy
    redirect_to funds_transfers_path
  end

 
  private
    def funds_transfer_params
      params.require(:funds_transfer).permit(
        :transfer_reference,
        :amount,
        :requested_date,
        :execution_date,
        :purpose,
        :fee_amount,
        :method,
        :status
      )

