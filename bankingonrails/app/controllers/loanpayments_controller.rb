class LoanPaymentsController < ApplicationController
  def index
    @loan_payments = LoanPayment.all
  end
 
  def find
    @loan_payment = LoanPayment.find(params[:id])
  end
 
  def new
    @loan_payment = LoanPayment.new
  end
 
  def edit
    @loan_payment = LoanPayment.find(params[:id])
  end
 
  def create
    @loan_payment = LoanPayment.new(loan_payment_params)
 
    if @loan_payment.save
      redirect_to loan_payments_path
    else
      render 'new'
    end
  end
 
  def update
    @loan_payment = LoanPayment.find(params[:id])
 
    if @loan_payment.update(loan_payment_params)
      redirect_to loan_payments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @loan_payment = LoanPayment.find(params[:id])
    @loan_payment.destroy
    redirect_to loan_payments_path
  end

 
  private
    def loan_payment_params
      params.require(:loan_payment).permit(
        :payment_reference,
        :amount,
        :payment_date,
        :method,
        :status
      )

  end
end