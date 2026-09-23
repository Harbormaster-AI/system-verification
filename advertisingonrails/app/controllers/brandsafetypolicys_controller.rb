
class BrandSafetyPolicysController < ApplicationController
  def index
    @brandSafetyPolicys = BrandSafetyPolicy.all
  end
 
  def find
    @brandSafetyPolicy = BrandSafetyPolicy.find(params[:id])
  end
 
  def new
    @brandSafetyPolicy = BrandSafetyPolicy.new
  end
 
  def edit
    @brandSafetyPolicy = BrandSafetyPolicy.find(params[:id])
  end
 
  def create
    @brandSafetyPolicy = BrandSafetyPolicy.new(brandSafetyPolicy_params)
 
    if @brandSafetyPolicy.save
      redirect_to brandSafetyPolicys_path
    else
      render 'new'
    end
  end
 
  def update
    @brandSafetyPolicy = BrandSafetyPolicy.find(params[:id])
 
    if @brandSafetyPolicy.update(brandSafetyPolicy_params)
      redirect_to brandSafetyPolicys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @brandSafetyPolicy = BrandSafetyPolicy.find(params[:id])
    @brandSafetyPolicy.destroy
    redirect_to brandSafetyPolicys_path
  end

 
  private
    def brandSafetyPolicy_params
      params.require(:brandSafetyPolicy).permit(:Level, :ContentRatingThreshold)
    end
end