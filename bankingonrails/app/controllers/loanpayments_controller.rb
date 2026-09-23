class LoanPaymentsController < ApplicationController
  def index
    @_loan_payments = LoanPayment.all
  end
 
  def find
    @_loan_payment = LoanPayment.find(params[:id])
  end
 
  def new
    @_loan_payment = LoanPayment.new
  end
 
  def edit
    @_loan_payment = LoanPayment.find(params[:id])
  end
 
  def create
    @_loan_payment = LoanPayment.new(_loan_payment_params)
 
    if @_loan_payment.save
      redirect_to _loan_payments_path
    else
      render 'new'
    end
  end
 
  def update
    @_loan_payment = LoanPayment.find(params[:id])
 
    if @_loan_payment.update(_loan_payment_params)
      redirect_to _loan_payments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_loan_payment = LoanPayment.find(params[:id])
    @_loan_payment.destroy
    redirect_to _loan_payments_path
  end

 
  private
    def _loan_payment_params
      params.require(:_loan_payment).permit(:paymentReference,\n\t\t\t :amount,\n\t\t\t :paymentDate,\n\t\t\t :Method,\n\t\t\t :Status)
    end
end

