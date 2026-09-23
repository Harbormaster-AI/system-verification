class AccountStatementsController < ApplicationController
  def index
    @account_statements = AccountStatement.all
  end
 
  def find
    @account_statement = AccountStatement.find(params[:id])
  end
 
  def new
    @account_statement = AccountStatement.new
  end
 
  def edit
    @account_statement = AccountStatement.find(params[:id])
  end
 
  def create
    @account_statement = AccountStatement.new(account_statement_params)
 
    if @account_statement.save
      redirect_to account_statements_path
    else
      render 'new'
    end
  end
 
  def update
    @account_statement = AccountStatement.find(params[:id])
 
    if @account_statement.update(account_statement_params)
      redirect_to account_statements_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @account_statement = AccountStatement.find(params[:id])
    @account_statement.destroy
    redirect_to account_statements_path
  end

 
  private
    def account_statement_params
      params.require(:account_statement).permit(
        :statement_number,
        :period_start,
        :period_end,
        :opening_balance,
        :closing_balance,
        :delivery_method
      )

