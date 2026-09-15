
class AccessPolicysController < ApplicationController
  def index
    @accessPolicys = AccessPolicy.all
  end
 
  def show
    @accessPolicy = AccessPolicy.find(params[:id])
  end
 
  def new
    @accessPolicy = AccessPolicy.new
  end
 
  def edit
    @accessPolicy = AccessPolicy.find(params[:id])
  end
 
  def create
    @accessPolicy = AccessPolicy.new(accessPolicy_params)
 
    if @accessPolicy.save
      redirect_to accessPolicys_path
    else
      render 'new'
    end
  end
 
  def update
    @accessPolicy = AccessPolicy.find(params[:id])
 
    if @accessPolicy.update(accessPolicy_params)
      redirect_to accessPolicys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @accessPolicy = AccessPolicy.find(params[:id])
    @accessPolicy.destroy
    redirect_to accessPolicys_path
  end

 
  private
    def accessPolicy_params
      params.require(:accessPolicy).permit(:name, :scope, :expiresAt)
    end
end