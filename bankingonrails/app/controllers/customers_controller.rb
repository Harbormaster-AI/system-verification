
class CustomersController < ApplicationController
  def index
    @_customers = Customer.all
  end
 
  def find
    @_customer = Customer.find(params[:id])
  end
 
  def new
    @_customer = Customer.new
  end
 
  def edit
    @_customer = Customer.find(params[:id])
  end
 
  def create
    @_customer = Customer.new(_customer_params)
 
    if @_customer.save
      redirect_to _customers_path
    else
      render 'new'
    end
  end
 
  def update
    @_customer = Customer.find(params[:id])
 
    if @_customer.update(_customer_params)
      redirect_to _customers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_customer = Customer.find(params[:id])
    @_customer.destroy
    redirect_to _customers_path
  end

 
  private
    def _customer_params
      params.require(:_customer).permit(:firstName, :lastName, :legalName, :dateOfBirth, :taxId, :email, :phone, :address, :CustomerType, :RiskRating, :KycStatus)
    end
end