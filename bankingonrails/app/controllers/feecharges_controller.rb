class FeeChargesController < ApplicationController
  def index
    @_fee_charges = FeeCharge.all
  end
 
  def find
    @_fee_charge = FeeCharge.find(params[:id])
  end
 
  def new
    @_fee_charge = FeeCharge.new
  end
 
  def edit
    @_fee_charge = FeeCharge.find(params[:id])
  end
 
  def create
    @_fee_charge = FeeCharge.new(_fee_charge_params)
 
    if @_fee_charge.save
      redirect_to _fee_charges_path
    else
      render 'new'
    end
  end
 
  def update
    @_fee_charge = FeeCharge.find(params[:id])
 
    if @_fee_charge.update(_fee_charge_params)
      redirect_to _fee_charges_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_fee_charge = FeeCharge.find(params[:id])
    @_fee_charge.destroy
    redirect_to _fee_charges_path
  end

 
  private
    def _fee_charge_params
      params.require(:_fee_charge).permit(
        :fee_code,
        :amount,
        :applied_on,
      )

