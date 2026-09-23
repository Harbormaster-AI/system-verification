class RiskAssessmentsController < ApplicationController
  def index
    @_risk_assessments = RiskAssessment.all
  end
 
  def find
    @_risk_assessment = RiskAssessment.find(params[:id])
  end
 
  def new
    @_risk_assessment = RiskAssessment.new
  end
 
  def edit
    @_risk_assessment = RiskAssessment.find(params[:id])
  end
 
  def create
    @_risk_assessment = RiskAssessment.new(_risk_assessment_params)
 
    if @_risk_assessment.save
      redirect_to _risk_assessments_path
    else
      render 'new'
    end
  end
 
  def update
    @_risk_assessment = RiskAssessment.find(params[:id])
 
    if @_risk_assessment.update(_risk_assessment_params)
      redirect_to _risk_assessments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_risk_assessment = RiskAssessment.find(params[:id])
    @_risk_assessment.destroy
    redirect_to _risk_assessments_path
  end

 
  private
    def _risk_assessment_params
      params.require(:_risk_assessment).permit(
        :score,
        :assessed_on,
        :_rating
      )

