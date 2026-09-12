class LoanAccountsController < ApplicationController
  def index
    @loanAccounts = LoanAccount.all
  end
 
  def show
    @loanAccount = LoanAccount.find(params[:id])
  end
 
  def new
    @loanAccount = LoanAccount.new
  end
 
  def edit
    @loanAccount = LoanAccount.find(params[:id])
  end
 
  def create
    @loanAccount = LoanAccount.new(loanAccount_params)
 
    if @loanAccount.save
      redirect_to loanAccounts_path
    else
      render 'new'
    end
  end
 
  def update
    @loanAccount = LoanAccount.find(params[:id])
 
    if @loanAccount.update(loanAccount_params)
      redirect_to loanAccounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @loanAccount = LoanAccount.find(params[:id])
    @loanAccount.destroy
    redirect_to loanAccounts_path
  end

 
  private
    def loanAccount_params
      params.require(:loanAccount).permit(:loanNumber, :principalAmount, :outstandingPrincipal, :interestRate, :originationDate, :maturityDate, :paymentDayOfMonth, :currency, :LoanType, :RateType, :Compounding, :Status)
    end
end