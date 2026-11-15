class PurchaseAgreementsController < ApplicationController
  def index
    @purchase_agreements = PurchaseAgreement.all
  end
 
  def find
    @purchase_agreement = PurchaseAgreement.find(params[:id])
  end
 
  def new
    @purchase_agreement = PurchaseAgreement.new
  end
 
  def edit
    @purchase_agreement = PurchaseAgreement.find(params[:id])
  end
 
  def create
    @purchase_agreement = PurchaseAgreement.new(purchase_agreement_params)
 
    if @purchase_agreement.save
      redirect_to purchase_agreements_path
    else
      render 'new'
    end
  end
 
  def update
    @purchase_agreement = PurchaseAgreement.find(params[:id])
 
    if @purchase_agreement.update(purchase_agreement_params)
      redirect_to purchase_agreements_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @purchase_agreement = PurchaseAgreement.find(params[:id])
    @purchase_agreement.destroy
    redirect_to purchase_agreements_path
  end

 
  private
    def purchase_agreement_params
      params.require(:purchase_agreement).permit(
        :agreement_number,
        :effective_date
      )

  end
end