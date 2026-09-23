class FundsTransfersController < ApplicationController
  def index
    @_funds_transfers = FundsTransfer.all
  end
 
  def find
    @_funds_transfer = FundsTransfer.find(params[:id])
  end
 
  def new
    @_funds_transfer = FundsTransfer.new
  end
 
  def edit
    @_funds_transfer = FundsTransfer.find(params[:id])
  end
 
  def create
    @_funds_transfer = FundsTransfer.new(_funds_transfer_params)
 
    if @_funds_transfer.save
      redirect_to _funds_transfers_path
    else
      render 'new'
    end
  end
 
  def update
    @_funds_transfer = FundsTransfer.find(params[:id])
 
    if @_funds_transfer.update(_funds_transfer_params)
      redirect_to _funds_transfers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_funds_transfer = FundsTransfer.find(params[:id])
    @_funds_transfer.destroy
    redirect_to _funds_transfers_path
  end

 
  private
    def _funds_transfer_params
      params.require(:_funds_transfer).permit(
        :transfer_reference,
        :amount,
        :requested_date,
        :execution_date,
        :purpose,
        :fee_amount,
        :_method,
        :_status
      )

