class BranchsController < ApplicationController
  def index
    @branchs = Branch.all
  end
 
  def show
    @branch = Branch.find(params[:id])
  end
 
  def new
    @branch = Branch.new
  end
 
  def edit
    @branch = Branch.find(params[:id])
  end
 
  def create
    @branch = Branch.new(branch_params)
 
    if @branch.save
      redirect_to branchs_path
    else
      render 'new'
    end
  end
 
  def update
    @branch = Branch.find(params[:id])
 
    if @branch.update(branch_params)
      redirect_to branchs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @branch = Branch.find(params[:id])
    @branch.destroy
    redirect_to branchs_path
  end

 
  private
    def branch_params
      params.require(:branch).permit(:name, :branchCode, :address, :phone, :openingHours)
    end
end