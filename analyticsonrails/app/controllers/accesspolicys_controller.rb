class AccessPolicysController < ApplicationController
  def index
    @access_policys = AccessPolicy.all
  end
 
  def find
    @access_policy = AccessPolicy.find(params[:id])
  end
 
  def new
    @access_policy = AccessPolicy.new
  end
 
  def edit
    @access_policy = AccessPolicy.find(params[:id])
  end
 
  def create
    @access_policy = AccessPolicy.new(access_policy_params)
 
    if @access_policy.save
      redirect_to access_policys_path
    else
      render 'new'
    end
  end
 
  def update
    @access_policy = AccessPolicy.find(params[:id])
 
    if @access_policy.update(access_policy_params)
      redirect_to access_policys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @access_policy = AccessPolicy.find(params[:id])
    @access_policy.destroy
    redirect_to access_policys_path
  end

 
  private
    def access_policy_params
      params.require(:access_policy).permit(
        :name,
        :subject_name,
        :access_level,
        :subject_type
      )

  end
end