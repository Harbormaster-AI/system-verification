class ServiceBulletinsController < ApplicationController
  def index
    @service_bulletins = ServiceBulletin.all
  end
 
  def find
    @service_bulletin = ServiceBulletin.find(params[:id])
  end
 
  def new
    @service_bulletin = ServiceBulletin.new
  end
 
  def edit
    @service_bulletin = ServiceBulletin.find(params[:id])
  end
 
  def create
    @service_bulletin = ServiceBulletin.new(service_bulletin_params)
 
    if @service_bulletin.save
      redirect_to service_bulletins_path
    else
      render 'new'
    end
  end
 
  def update
    @service_bulletin = ServiceBulletin.find(params[:id])
 
    if @service_bulletin.update(service_bulletin_params)
      redirect_to service_bulletins_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @service_bulletin = ServiceBulletin.find(params[:id])
    @service_bulletin.destroy
    redirect_to service_bulletins_path
  end

 
  private
    def service_bulletin_params
      params.require(:service_bulletin).permit(
        :bulletin_number,
        :category
      )

  end
end