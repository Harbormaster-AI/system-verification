class CollateralsController < ApplicationController
  def index
    @collaterals = Collateral.all
  end
 
  def show
    @collateral = Collateral.find(params[:id])
  end
 
  def new
    @collateral = Collateral.new
  end
 
  def edit
    @collateral = Collateral.find(params[:id])
  end
 
  def create
    @collateral = Collateral.new(collateral_params)
 
    if @collateral.save
      redirect_to collaterals_path
    else
      render 'new'
    end
  end
 
  def update
    @collateral = Collateral.find(params[:id])
 
    if @collateral.update(collateral_params)
      redirect_to collaterals_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @collateral = Collateral.find(params[:id])
    @collateral.destroy
    redirect_to collaterals_path
  end

 
  private
    def collateral_params
      params.require(:collateral).permit(:appraisedValue, :description, :location, :CollateralType)
    end
end