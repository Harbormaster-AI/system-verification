class DisputesController < ApplicationController
  def index
    @disputes = Dispute.all
  end
 
  def show
    @dispute = Dispute.find(params[:id])
  end
 
  def new
    @dispute = Dispute.new
  end
 
  def edit
    @dispute = Dispute.find(params[:id])
  end
 
  def create
    @dispute = Dispute.new(dispute_params)
 
    if @dispute.save
      redirect_to disputes_path
    else
      render 'new'
    end
  end
 
  def update
    @dispute = Dispute.find(params[:id])
 
    if @dispute.update(dispute_params)
      redirect_to disputes_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dispute = Dispute.find(params[:id])
    @dispute.destroy
    redirect_to disputes_path
  end

 
  private
    def dispute_params
      params.require(:dispute).permit(:disputeReference, :raisedOn, :reason, :Status)
    end
end