
class PaymentMethodsController < ApplicationController
  def index
    @paymentMethods = PaymentMethod.all
  end
 
  def find
    @paymentMethod = PaymentMethod.find(params[:id])
  end
 
  def new
    @paymentMethod = PaymentMethod.new
  end
 
  def edit
    @paymentMethod = PaymentMethod.find(params[:id])
  end
 
  def create
    @paymentMethod = PaymentMethod.new(paymentMethod_params)
 
    if @paymentMethod.save
      redirect_to paymentMethods_path
    else
      render 'new'
    end
  end
 
  def update
    @paymentMethod = PaymentMethod.find(params[:id])
 
    if @paymentMethod.update(paymentMethod_params)
      redirect_to paymentMethods_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @paymentMethod = PaymentMethod.find(params[:id])
    @paymentMethod.destroy
    redirect_to paymentMethods_path
  end

 
  private
    def paymentMethod_params
      params.require(:paymentMethod).permit(:last4, :cardholderName, :billingAddress, :MethodType)
    end
end