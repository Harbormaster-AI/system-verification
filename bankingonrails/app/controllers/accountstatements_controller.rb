class AccountStatementsController < ApplicationController
  def index
    @_account_statements = AccountStatement.all
  end
 
  def find
    @_account_statement = AccountStatement.find(params[:id])
  end
 
  def new
    @_account_statement = AccountStatement.new
  end
 
  def edit
    @_account_statement = AccountStatement.find(params[:id])
  end
 
  def create
    @_account_statement = AccountStatement.new(_account_statement_params)
 
    if @_account_statement.save
      redirect_to _account_statements_path
    else
      render 'new'
    end
  end
 
  def update
    @_account_statement = AccountStatement.find(params[:id])
 
    if @_account_statement.update(_account_statement_params)
      redirect_to _account_statements_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_account_statement = AccountStatement.find(params[:id])
    @_account_statement.destroy
    redirect_to _account_statements_path
  end

 
  private
    def _account_statement_params
      params.require(:_account_statement).permit(:statementNumber,\n\t\t\t :periodStart,\n\t\t\t :periodEnd,\n\t\t\t :openingBalance,\n\t\t\t :closingBalance,\n\t\t\t :DeliveryMethod)
    end
end

