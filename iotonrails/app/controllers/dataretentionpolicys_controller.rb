
class DataRetentionPolicysController < ApplicationController
  def index
    @dataRetentionPolicys = DataRetentionPolicy.all
  end
 
  def show
    @dataRetentionPolicy = DataRetentionPolicy.find(params[:id])
  end
 
  def new
    @dataRetentionPolicy = DataRetentionPolicy.new
  end
 
  def edit
    @dataRetentionPolicy = DataRetentionPolicy.find(params[:id])
  end
 
  def create
    @dataRetentionPolicy = DataRetentionPolicy.new(dataRetentionPolicy_params)
 
    if @dataRetentionPolicy.save
      redirect_to dataRetentionPolicys_path
    else
      render 'new'
    end
  end
 
  def update
    @dataRetentionPolicy = DataRetentionPolicy.find(params[:id])
 
    if @dataRetentionPolicy.update(dataRetentionPolicy_params)
      redirect_to dataRetentionPolicys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dataRetentionPolicy = DataRetentionPolicy.find(params[:id])
    @dataRetentionPolicy.destroy
    redirect_to dataRetentionPolicys_path
  end

 
  private
    def dataRetentionPolicy_params
      params.require(:dataRetentionPolicy).permit(:name, :retentionDays)
    end
end