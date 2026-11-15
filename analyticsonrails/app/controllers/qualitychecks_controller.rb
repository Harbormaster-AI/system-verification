class QualityChecksController < ApplicationController
  def index
    @quality_checks = QualityCheck.all
  end
 
  def find
    @quality_check = QualityCheck.find(params[:id])
  end
 
  def new
    @quality_check = QualityCheck.new
  end
 
  def edit
    @quality_check = QualityCheck.find(params[:id])
  end
 
  def create
    @quality_check = QualityCheck.new(quality_check_params)
 
    if @quality_check.save
      redirect_to quality_checks_path
    else
      render 'new'
    end
  end
 
  def update
    @quality_check = QualityCheck.find(params[:id])
 
    if @quality_check.update(quality_check_params)
      redirect_to quality_checks_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @quality_check = QualityCheck.find(params[:id])
    @quality_check.destroy
    redirect_to quality_checks_path
  end

 
  private
    def quality_check_params
      params.require(:quality_check).permit(
        :checked_at,
        :observed_value,
        :sample_size,
        :status
      )

  end
end