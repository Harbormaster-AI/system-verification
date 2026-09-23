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
      params.require(:_loan_account).permit(:loanNumber,\n\t\t\t :principalAmount,\n\t\t\t :outstandingPrincipal,\n\t\t\t :interestRate,\n\t\t\t :originationDate,\n\t\t\t :maturityDate,\n\t\t\t :paymentDayOfMonth,\n\t\t\t :currency,\n\t\t\t :LoanType,\n\t\t\t :RateType,\n\t\t\t :Compounding,\n\t\t\t :Status)
    end
end

