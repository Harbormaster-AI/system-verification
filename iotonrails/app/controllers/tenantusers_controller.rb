
class TenantUsersController < ApplicationController
  def index
    @tenantUsers = TenantUser.all
  end
 
  def show
    @tenantUser = TenantUser.find(params[:id])
  end
 
  def new
    @tenantUser = TenantUser.new
  end
 
  def edit
    @tenantUser = TenantUser.find(params[:id])
  end
 
  def create
    @tenantUser = TenantUser.new(tenantUser_params)
 
    if @tenantUser.save
      redirect_to tenantUsers_path
    else
      render 'new'
    end
  end
 
  def update
    @tenantUser = TenantUser.find(params[:id])
 
    if @tenantUser.update(tenantUser_params)
      redirect_to tenantUsers_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @tenantUser = TenantUser.find(params[:id])
    @tenantUser.destroy
    redirect_to tenantUsers_path
  end

 
  private
    def tenantUser_params
      params.require(:tenantUser).permit(:firstName, :lastName, :email, :Role)
    end
end