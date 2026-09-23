class BranchsController < ApplicationController
  def index
    @_branchs = Branch.all
  end
 
  def find
    @_branch = Branch.find(params[:id])
  end
 
  def new
    @_branch = Branch.new
  end
 
  def edit
    @_branch = Branch.find(params[:id])
  end
 
  def create
    @_branch = Branch.new(_branch_params)
 
    if @_branch.save
      redirect_to _branchs_path
    else
      render 'new'
    end
  end
 
  def update
    @_branch = Branch.find(params[:id])
 
    if @_branch.update(_branch_params)
      redirect_to _branchs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_branch = Branch.find(params[:id])
    @_branch.destroy
    redirect_to _branchs_path
  end

 
  private
    def _branch_params
      params.require(:_branch).permit(
        :name,
        :branch_code,
        :address,
        :phone,
      )

