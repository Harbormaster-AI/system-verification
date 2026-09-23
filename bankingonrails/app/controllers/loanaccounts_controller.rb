class LoanAccountsController < ApplicationController
  def index
    @_loan_accounts = LoanAccount.all
  end
 
  def find
    @_loan_account = LoanAccount.find(params[:id])
  end
 
  def new
    @_loan_account = LoanAccount.new
  end
 
  def edit
    @_loan_account = LoanAccount.find(params[:id])
  end
 
  def create
    @_loan_account = LoanAccount.new(_loan_account_params)
 
    if @_loan_account.save
      redirect_to _loan_accounts_path
    else
      render 'new'
    end
  end
 
  def update
    @_loan_account = LoanAccount.find(params[:id])
 
    if @_loan_account.update(_loan_account_params)
      redirect_to _loan_accounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_loan_account = LoanAccount.find(params[:id])
    @_loan_account.destroy
    redirect_to _loan_accounts_path
  end

 
  private
    def _loan_account_params
      params.require(:_loan_account).permit(
        :loan_number,
        :principal_amount,
        :outstanding_principal,
        :interest_rate,
        :origination_date,
        :maturity_date,
        :payment_day_of_month,
        :currency,
        :_loan_type,
        :_rate_type,
        :_compounding,
      )

