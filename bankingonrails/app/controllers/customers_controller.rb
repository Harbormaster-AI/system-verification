class CustomersController < ApplicationController
  def index
    @customers = Customer.all
  end
 
  def show
    @customer = Customer.find(params[:id])
  end
 
  def new
    @customer = Customer.new
  end
 
  def edit
    @customer = Customer.find(params[:id])
  end
 
  def create
    @customer = Customer.new(customer_params)
 
    if @customer.save
      redirect_to customers_path
    else
      render 'new'
    end
  end
 
  def update
    @customer = Customer.find(params[:id])
 
    if @customer.update(customer_params)
      redirect_to customers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @customer = Customer.find(params[:id])
    @customer.destroy
    redirect_to customers_path
  end

 
  private
    def customer_params
      params.require(:customer).permit(:firstName, :lastName, :legalName, :dateOfBirth, :taxId, :email, :phone, :address, :CustomerType, :RiskRating, :KycStatus)
    end
end