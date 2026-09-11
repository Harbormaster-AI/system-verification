class ExternalAccountsController < ApplicationController
  def index
    @externalAccounts = ExternalAccount.all
  end
 
  def show
    @externalAccount = ExternalAccount.find(params[:id])
  end
 
  def new
    @externalAccount = ExternalAccount.new
  end
 
  def edit
    @externalAccount = ExternalAccount.find(params[:id])
  end
 
  def create
    @externalAccount = ExternalAccount.new(externalAccount_params)
 
    if @externalAccount.save
      redirect_to externalAccounts_path
    else
      render 'new'
    end
  end
 
  def update
    @externalAccount = ExternalAccount.find(params[:id])
 
    if @externalAccount.update(externalAccount_params)
      redirect_to externalAccounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @externalAccount = ExternalAccount.find(params[:id])
    @externalAccount.destroy
    redirect_to externalAccounts_path
  end

 
  private
    def externalAccount_params
      params.require(:externalAccount).permit(:name, :iban, :accountNumber, :bic, :bankName, :country)
    end
end