class ExternalAccountsController < ApplicationController
  def index
    @_external_accounts = ExternalAccount.all
  end
 
  def find
    @_external_account = ExternalAccount.find(params[:id])
  end
 
  def new
    @_external_account = ExternalAccount.new
  end
 
  def edit
    @_external_account = ExternalAccount.find(params[:id])
  end
 
  def create
    @_external_account = ExternalAccount.new(_external_account_params)
 
    if @_external_account.save
      redirect_to _external_accounts_path
    else
      render 'new'
    end
  end
 
  def update
    @_external_account = ExternalAccount.find(params[:id])
 
    if @_external_account.update(_external_account_params)
      redirect_to _external_accounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_external_account = ExternalAccount.find(params[:id])
    @_external_account.destroy
    redirect_to _external_accounts_path
  end

 
  private
    def _external_account_params
      params.require(:_external_account).permit(
        :name,
        :iban,
        :account_number,
        :bic,
        :bank_name,
      )

