class FeeChargesController < ApplicationController
  def index
    @fee_charges = FeeCharge.all
  end
 
  def find
    @fee_charge = FeeCharge.find(params[:id])
  end
 
  def new
    @fee_charge = FeeCharge.new
  end
 
  def edit
    @fee_charge = FeeCharge.find(params[:id])
  end
 
  def create
    @fee_charge = FeeCharge.new(fee_charge_params)
 
    if @fee_charge.save
      redirect_to fee_charges_path
    else
      render 'new'
    end
  end
 
  def update
    @fee_charge = FeeCharge.find(params[:id])
 
    if @fee_charge.update(fee_charge_params)
      redirect_to fee_charges_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @fee_charge = FeeCharge.find(params[:id])
    @fee_charge.destroy
    redirect_to fee_charges_path
  end

 
  private
    def fee_charge_params
      params.require(:fee_charge).permit(
        :fee_code,
        :amount,
        :applied_on,
        :fee_type
      )

