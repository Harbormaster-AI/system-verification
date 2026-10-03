class BankingProductsController < ApplicationController
  def index
    @banking_products = BankingProduct.all
  end

  def find
    @banking_product = BankingProduct.find(params[:id])
  end

  def new
    @banking_product = BankingProduct.new
  end

  def edit
    @banking_product = BankingProduct.find(params[:id])
  end

  def create
    @banking_product = BankingProduct.new(banking_product_params)

    if @banking_product.save
      redirect_to banking_products_path
    else
      render "new"
    end
  end

  def update
    @banking_product = BankingProduct.find(params[:id])

    if @banking_product.update(banking_product_params)
      redirect_to banking_products_path
    else
      render "edit"
    end
  end

  def destroy
    @banking_product = BankingProduct.find(params[:id])
    @banking_product.destroy
    redirect_to banking_products_path
  end

  private

  def banking_product_params
    params.require(:banking_product).permit(
      :product_code,
      :name,
      :description,
      :product_category
    )
  end
end
