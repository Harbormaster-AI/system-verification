
class BillingProfilesController < ApplicationController
  def index
    @billingProfiles = BillingProfile.all
  end
 
  def find
    @billingProfile = BillingProfile.find(params[:id])
  end
 
  def new
    @billingProfile = BillingProfile.new
  end
 
  def edit
    @billingProfile = BillingProfile.find(params[:id])
  end
 
  def create
    @billingProfile = BillingProfile.new(billingProfile_params)
 
    if @billingProfile.save
      redirect_to billingProfiles_path
    else
      render 'new'
    end
  end
 
  def update
    @billingProfile = BillingProfile.find(params[:id])
 
    if @billingProfile.update(billingProfile_params)
      redirect_to billingProfiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @billingProfile = BillingProfile.find(params[:id])
    @billingProfile.destroy
    redirect_to billingProfiles_path
  end

 
  private
    def billingProfile_params
      params.require(:billingProfile).permit(:billingName, :taxId, :billingAddress, :PaymentTerms)
    end
end