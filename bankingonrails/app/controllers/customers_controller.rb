class CustomersController < ApplicationController
  def index
    @customers = Customer.all
  end
 
  def find
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
      params.require(:customer).permit(
        :first_name,
        :last_name,
        :legal_name,
        :date_of_birth,
        :tax_id,
        :email,
        :phone,
        :address,
        :customer_type,
        :risk_rating,
        :kyc_status
      )

