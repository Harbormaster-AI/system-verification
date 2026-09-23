class TransactionsController < ApplicationController
  def index
    @_transactions = Transaction.all
  end
 
  def find
    @_transaction = Transaction.find(params[:id])
  end
 
  def new
    @_transaction = Transaction.new
  end
 
  def edit
    @_transaction = Transaction.find(params[:id])
  end
 
  def create
    @_transaction = Transaction.new(_transaction_params)
 
    if @_transaction.save
      redirect_to _transactions_path
    else
      render 'new'
    end
  end
 
  def update
    @_transaction = Transaction.find(params[:id])
 
    if @_transaction.update(_transaction_params)
      redirect_to _transactions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_transaction = Transaction.find(params[:id])
    @_transaction.destroy
    redirect_to _transactions_path
  end

 
  private
    def _transaction_params
      params.require(:_transaction).permit(:bookingDate,\n\t\t\t :valueDate,\n\t\t\t :amount,\n\t\t\t :description,\n\t\t\t :Direction,\n\t\t\t :TransactionType,\n\t\t\t :Status,\n\t\t\t :Channel)
    end
end

