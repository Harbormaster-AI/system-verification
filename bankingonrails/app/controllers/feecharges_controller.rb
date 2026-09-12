class FeeChargesController < ApplicationController
  def index
    @feeCharges = FeeCharge.all
  end
 
  def show
    @feeCharge = FeeCharge.find(params[:id])
  end
 
  def new
    @feeCharge = FeeCharge.new
  end
 
  def edit
    @feeCharge = FeeCharge.find(params[:id])
  end
 
  def create
    @feeCharge = FeeCharge.new(feeCharge_params)
 
    if @feeCharge.save
      redirect_to feeCharges_path
    else
      render 'new'
    end
  end
 
  def update
    @feeCharge = FeeCharge.find(params[:id])
 
    if @feeCharge.update(feeCharge_params)
      redirect_to feeCharges_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @feeCharge = FeeCharge.find(params[:id])
    @feeCharge.destroy
    redirect_to feeCharges_path
  end

 
  private
    def feeCharge_params
      params.require(:feeCharge).permit(:feeCode, :amount, :appliedOn, :FeeType)
    end
end