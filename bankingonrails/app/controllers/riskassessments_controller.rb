class RiskAssessmentsController < ApplicationController
  def index
    @riskAssessments = RiskAssessment.all
  end
 
  def show
    @riskAssessment = RiskAssessment.find(params[:id])
  end
 
  def new
    @riskAssessment = RiskAssessment.new
  end
 
  def edit
    @riskAssessment = RiskAssessment.find(params[:id])
  end
 
  def create
    @riskAssessment = RiskAssessment.new(riskAssessment_params)
 
    if @riskAssessment.save
      redirect_to riskAssessments_path
    else
      render 'new'
    end
  end
 
  def update
    @riskAssessment = RiskAssessment.find(params[:id])
 
    if @riskAssessment.update(riskAssessment_params)
      redirect_to riskAssessments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @riskAssessment = RiskAssessment.find(params[:id])
    @riskAssessment.destroy
    redirect_to riskAssessments_path
  end

 
  private
    def riskAssessment_params
      params.require(:riskAssessment).permit(:score, :assessedOn, :Rating)
    end
end