class LoanPaymentsController < ApplicationController
  def index
    @loanPayments = LoanPayment.all
  end
 
  def show
    @loanPayment = LoanPayment.find(params[:id])
  end
 
  def new
    @loanPayment = LoanPayment.new
  end
 
  def edit
    @loanPayment = LoanPayment.find(params[:id])
  end
 
  def create
    @loanPayment = LoanPayment.new(loanPayment_params)
 
    if @loanPayment.save
      redirect_to loanPayments_path
    else
      render 'new'
    end
  end
 
  def update
    @loanPayment = LoanPayment.find(params[:id])
 
    if @loanPayment.update(loanPayment_params)
      redirect_to loanPayments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @loanPayment = LoanPayment.find(params[:id])
    @loanPayment.destroy
    redirect_to loanPayments_path
  end

 
  private
    def loanPayment_params
      params.require(:loanPayment).permit(:paymentReference, :amount, :paymentDate, :Method, :Status)
    end
end