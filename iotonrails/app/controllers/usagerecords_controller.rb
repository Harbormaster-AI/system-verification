
class UsageRecordsController < ApplicationController
  def index
    @usageRecords = UsageRecord.all
  end
 
  def show
    @usageRecord = UsageRecord.find(params[:id])
  end
 
  def new
    @usageRecord = UsageRecord.new
  end
 
  def edit
    @usageRecord = UsageRecord.find(params[:id])
  end
 
  def create
    @usageRecord = UsageRecord.new(usageRecord_params)
 
    if @usageRecord.save
      redirect_to usageRecords_path
    else
      render 'new'
    end
  end
 
  def update
    @usageRecord = UsageRecord.find(params[:id])
 
    if @usageRecord.update(usageRecord_params)
      redirect_to usageRecords_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @usageRecord = UsageRecord.find(params[:id])
    @usageRecord.destroy
    redirect_to usageRecords_path
  end

 
  private
    def usageRecord_params
      params.require(:usageRecord).permit(:periodStart, :periodEnd, :messagesSent, :dataVolumeMB)
    end
end