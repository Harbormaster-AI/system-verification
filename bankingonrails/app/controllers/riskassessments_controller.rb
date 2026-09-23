class RiskAssessmentsController < ApplicationController
  def index
    @risk_assessments = RiskAssessment.all
  end

  def find
    @risk_assessment = RiskAssessment.find(params[:id])
  end

  def new
    @risk_assessment = RiskAssessment.new
  end

  def edit
    @risk_assessment = RiskAssessment.find(params[:id])
  end

  def create
    @risk_assessment = RiskAssessment.new(risk_assessment_params)

    if @risk_assessment.save
      redirect_to risk_assessments_path
    else
      render "new"
    end
  end

  def update
    @risk_assessment = RiskAssessment.find(params[:id])

    if @risk_assessment.update(risk_assessment_params)
      redirect_to risk_assessments_path
    else
      render "edit"
    end
  end

  def destroy
    @risk_assessment = RiskAssessment.find(params[:id])
    @risk_assessment.destroy
    redirect_to risk_assessments_path
  end

  private

  def risk_assessment_params
    params.require(:risk_assessment).permit(
      :score,
      :assessed_on,
      :rating
    )
  end
end
