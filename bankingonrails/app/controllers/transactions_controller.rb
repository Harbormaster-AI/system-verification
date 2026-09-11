class TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all
  end
 
  def show
    @transaction = Transaction.find(params[:id])
  end
 
  def new
    @transaction = Transaction.new
  end
 
  def edit
    @transaction = Transaction.find(params[:id])
  end
 
  def create
    @transaction = Transaction.new(transaction_params)
 
    if @transaction.save
      redirect_to transactions_path
    else
      render 'new'
    end
  end
 
  def update
    @transaction = Transaction.find(params[:id])
 
    if @transaction.update(transaction_params)
      redirect_to transactions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
    redirect_to transactions_path
  end

 
  private
    def transaction_params
      params.require(:transaction).permit(:bookingDate, :valueDate, :amount, :description, :Direction, :TransactionType, :Status, :Channel)
    end
end