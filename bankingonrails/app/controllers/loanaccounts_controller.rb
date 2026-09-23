class LoanAccountsController < ApplicationController
  def index
    @loan_accounts = LoanAccount.all
  end
 
  def find
    @loan_account = LoanAccount.find(params[:id])
  end
 
  def new
    @loan_account = LoanAccount.new
  end
 
  def edit
    @loan_account = LoanAccount.find(params[:id])
  end
 
  def create
    @loan_account = LoanAccount.new(loan_account_params)
 
    if @loan_account.save
      redirect_to loan_accounts_path
    else
      render 'new'
    end
  end
 
  def update
    @loan_account = LoanAccount.find(params[:id])
 
    if @loan_account.update(loan_account_params)
      redirect_to loan_accounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @loan_account = LoanAccount.find(params[:id])
    @loan_account.destroy
    redirect_to loan_accounts_path
  end

 
  private
    def loan_account_params
      params.require(:loan_account).permit(
        :loan_number,
        :principal_amount,
        :outstanding_principal,
        :interest_rate,
        :origination_date,
        :maturity_date,
        :payment_day_of_month,
        :currency,
        :loan_type,
        :rate_type,
        :compounding,
        :status
      )

