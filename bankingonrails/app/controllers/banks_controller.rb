class BanksController < ApplicationController
  def index
    @_banks = Bank.all
  end
 
  def find
    @_bank = Bank.find(params[:id])
  end
 
  def new
    @_bank = Bank.new
  end
 
  def edit
    @_bank = Bank.find(params[:id])
  end
 
  def create
    @_bank = Bank.new(_bank_params)
 
    if @_bank.save
      redirect_to _banks_path
    else
      render 'new'
    end
  end
 
  def update
    @_bank = Bank.find(params[:id])
 
    if @_bank.update(_bank_params)
      redirect_to _banks_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_bank = Bank.find(params[:id])
    @_bank.destroy
    redirect_to _banks_path
  end

 
  private
    def _bank_params
      params.require(:_bank).permit(:name, :legalName, :swiftBic, :headquartersCountry, :website)
    end
end

