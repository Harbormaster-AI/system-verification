class DisputesController < ApplicationController
  def index
    @_disputes = Dispute.all
  end
 
  def find
    @_dispute = Dispute.find(params[:id])
  end
 
  def new
    @_dispute = Dispute.new
  end
 
  def edit
    @_dispute = Dispute.find(params[:id])
  end
 
  def create
    @_dispute = Dispute.new(_dispute_params)
 
    if @_dispute.save
      redirect_to _disputes_path
    else
      render 'new'
    end
  end
 
  def update
    @_dispute = Dispute.find(params[:id])
 
    if @_dispute.update(_dispute_params)
      redirect_to _disputes_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_dispute = Dispute.find(params[:id])
    @_dispute.destroy
    redirect_to _disputes_path
  end

 
  private
    def _dispute_params
      params.require(:_dispute).permit(:disputeReference,\n\t\t\t :raisedOn,\n\t\t\t :reason,\n\t\t\t :Status)
    end
end

