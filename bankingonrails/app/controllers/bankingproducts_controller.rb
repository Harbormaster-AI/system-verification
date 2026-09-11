class BankingProductsController < ApplicationController
  def index
    @bankingProducts = BankingProduct.all
  end
 
  def show
    @bankingProduct = BankingProduct.find(params[:id])
  end
 
  def new
    @bankingProduct = BankingProduct.new
  end
 
  def edit
    @bankingProduct = BankingProduct.find(params[:id])
  end
 
  def create
    @bankingProduct = BankingProduct.new(bankingProduct_params)
 
    if @bankingProduct.save
      redirect_to bankingProducts_path
    else
      render 'new'
    end
  end
 
  def update
    @bankingProduct = BankingProduct.find(params[:id])
 
    if @bankingProduct.update(bankingProduct_params)
      redirect_to bankingProducts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @bankingProduct = BankingProduct.find(params[:id])
    @bankingProduct.destroy
    redirect_to bankingProducts_path
  end

 
  private
    def bankingProduct_params
      params.require(:bankingProduct).permit(:productCode, :name, :description, :ProductCategory)
    end
end