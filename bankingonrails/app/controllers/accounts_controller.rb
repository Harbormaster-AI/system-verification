class AccountsController < ApplicationController
  def index
    @_accounts = Account.all
  end
 
  def find
    @_account = Account.find(params[:id])
  end
 
  def new
    @_account = Account.new
  end
 
  def edit
    @_account = Account.find(params[:id])
  end
 
  def create
    @_account = Account.new(_account_params)
 
    if @_account.save
      redirect_to _accounts_path
    else
      render 'new'
    end
  end
 
  def update
    @_account = Account.find(params[:id])
 
    if @_account.update(_account_params)
      redirect_to _accounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_account = Account.find(params[:id])
    @_account.destroy
    redirect_to _accounts_path
  end

 
  private
    def _account_params
      params.require(:_account).permit(:accountNumber,\n\t\t\t :iban,\n\t\t\t :accountName,\n\t\t\t :currency,\n\t\t\t :openedOn,\n\t\t\t :closedOn,\n\t\t\t :AccountType,\n\t\t\t :OwnershipType,\n\t\t\t :Status)
    end
end

