class ExternalAccountsController < ApplicationController
  def index
    @external_accounts = ExternalAccount.all
  end
 
  def find
    @external_account = ExternalAccount.find(params[:id])
  end
 
  def new
    @external_account = ExternalAccount.new
  end
 
  def edit
    @external_account = ExternalAccount.find(params[:id])
  end
 
  def create
    @external_account = ExternalAccount.new(external_account_params)
 
    if @external_account.save
      redirect_to external_accounts_path
    else
      render 'new'
    end
  end
 
  def update
    @external_account = ExternalAccount.find(params[:id])
 
    if @external_account.update(external_account_params)
      redirect_to external_accounts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @external_account = ExternalAccount.find(params[:id])
    @external_account.destroy
    redirect_to external_accounts_path
  end

 
  private
    def external_account_params
      params.require(:external_account).permit(
        :name,
        :iban,
        :account_number,
        :bic,
        :bank_name,
        :country
      )

  end
end