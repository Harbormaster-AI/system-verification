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
      params.require(:_customer).permit(:firstName,\n\t\t\t :lastName,\n\t\t\t :legalName,\n\t\t\t :dateOfBirth,\n\t\t\t :taxId,\n\t\t\t :email,\n\t\t\t :phone,\n\t\t\t :address,\n\t\t\t :CustomerType,\n\t\t\t :RiskRating,\n\t\t\t :KycStatus)
    end
end

