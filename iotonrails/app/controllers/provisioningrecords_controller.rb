
class ProvisioningRecordsController < ApplicationController
  def index
    @provisioningRecords = ProvisioningRecord.all
  end
 
  def show
    @provisioningRecord = ProvisioningRecord.find(params[:id])
  end
 
  def new
    @provisioningRecord = ProvisioningRecord.new
  end
 
  def edit
    @provisioningRecord = ProvisioningRecord.find(params[:id])
  end
 
  def create
    @provisioningRecord = ProvisioningRecord.new(provisioningRecord_params)
 
    if @provisioningRecord.save
      redirect_to provisioningRecords_path
    else
      render 'new'
    end
  end
 
  def update
    @provisioningRecord = ProvisioningRecord.find(params[:id])
 
    if @provisioningRecord.update(provisioningRecord_params)
      redirect_to provisioningRecords_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @provisioningRecord = ProvisioningRecord.find(params[:id])
    @provisioningRecord.destroy
    redirect_to provisioningRecords_path
  end

 
  private
    def provisioningRecord_params
      params.require(:provisioningRecord).permit(:enrolledAt, :provisioningService, :Method, :Status)
    end
end