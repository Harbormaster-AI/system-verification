
class CollateralsController < ApplicationController
  def index
    @_collaterals = Collateral.all
  end
 
  def find
    @_collateral = Collateral.find(params[:id])
  end
 
  def new
    @_collateral = Collateral.new
  end
 
  def edit
    @_collateral = Collateral.find(params[:id])
  end
 
  def create
    @_collateral = Collateral.new(_collateral_params)
 
    if @_collateral.save
      redirect_to _collaterals_path
    else
      render 'new'
    end
  end
 
  def update
    @_collateral = Collateral.find(params[:id])
 
    if @_collateral.update(_collateral_params)
      redirect_to _collaterals_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_collateral = Collateral.find(params[:id])
    @_collateral.destroy
    redirect_to _collaterals_path
  end

 
  private
    def _collateral_params
      params.require(:_collateral).permit(:collateralIdentifier, :appraisedValue, :description, :location, :CollateralType)
    end
end