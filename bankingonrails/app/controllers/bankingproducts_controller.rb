class BankingProductsController < ApplicationController
  def index
    @_banking_products = BankingProduct.all
  end
 
  def find
    @_banking_product = BankingProduct.find(params[:id])
  end
 
  def new
    @_banking_product = BankingProduct.new
  end
 
  def edit
    @_banking_product = BankingProduct.find(params[:id])
  end
 
  def create
    @_banking_product = BankingProduct.new(_banking_product_params)
 
    if @_banking_product.save
      redirect_to _banking_products_path
    else
      render 'new'
    end
  end
 
  def update
    @_banking_product = BankingProduct.find(params[:id])
 
    if @_banking_product.update(_banking_product_params)
      redirect_to _banking_products_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_banking_product = BankingProduct.find(params[:id])
    @_banking_product.destroy
    redirect_to _banking_products_path
  end

 
  private
    def _banking_product_params
      params.require(:_banking_product).permit(
        :product_code,
        :name,
        :description,
        :_product_category
      )

