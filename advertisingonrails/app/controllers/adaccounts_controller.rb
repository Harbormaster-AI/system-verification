
class AdAccountsController < ApplicationController
  def index
    @adAccounts = AdAccount.all
  end
 
  def find
    @adAccount = AdAccount.find(params[:id])
  end
 
  def new
    @adAccount = AdAccount.new
  end
 
  def edit
    @adAccount = AdAccount.find(params[:id])
  end
 
  def create
    @adAccount = AdAccount.new(adAccount_params)
 
    if @adAccount.save
      redirect_to adAccounts_path
    else
      render 'new'
    end
  end
 
  def update
    @adAccount = AdAccount.find(params[:id])
 
    if @adAccount.update(adAccount_params)
      redirect_to adAccounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @adAccount = AdAccount.find(params[:id])
    @adAccount.destroy
    redirect_to adAccounts_path
  end

 
  private
    def adAccount_params
      params.require(:adAccount).permit(:name, :accountCode, :defaultCurrency, :defaultTimezone)
    end
end