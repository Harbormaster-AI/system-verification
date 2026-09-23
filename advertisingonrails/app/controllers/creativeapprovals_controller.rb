
class CreativeApprovalsController < ApplicationController
  def index
    @creativeApprovals = CreativeApproval.all
  end
 
  def find
    @creativeApproval = CreativeApproval.find(params[:id])
  end
 
  def new
    @creativeApproval = CreativeApproval.new
  end
 
  def edit
    @creativeApproval = CreativeApproval.find(params[:id])
  end
 
  def create
    @creativeApproval = CreativeApproval.new(creativeApproval_params)
 
    if @creativeApproval.save
      redirect_to creativeApprovals_path
    else
      render 'new'
    end
  end
 
  def update
    @creativeApproval = CreativeApproval.find(params[:id])
 
    if @creativeApproval.update(creativeApproval_params)
      redirect_to creativeApprovals_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @creativeApproval = CreativeApproval.find(params[:id])
    @creativeApproval.destroy
    redirect_to creativeApprovals_path
  end

 
  private
    def creativeApproval_params
      params.require(:creativeApproval).permit(:reviewer, :reviewedAt, :Status)
    end
end