class QualityRulesController < ApplicationController
  def index
    @quality_rules = QualityRule.all
  end
 
  def find
    @quality_rule = QualityRule.find(params[:id])
  end
 
  def new
    @quality_rule = QualityRule.new
  end
 
  def edit
    @quality_rule = QualityRule.find(params[:id])
  end
 
  def create
    @quality_rule = QualityRule.new(quality_rule_params)
 
    if @quality_rule.save
      redirect_to quality_rules_path
    else
      render 'new'
    end
  end
 
  def update
    @quality_rule = QualityRule.find(params[:id])
 
    if @quality_rule.update(quality_rule_params)
      redirect_to quality_rules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @quality_rule = QualityRule.find(params[:id])
    @quality_rule.destroy
    redirect_to quality_rules_path
  end

 
  private
    def quality_rule_params
      params.require(:quality_rule).permit(
        :name,
        :threshold,
        :target_field,
        :dimension,
        :operator_
      )

  end
end