
class AlertRulesController < ApplicationController
  def index
    @alertRules = AlertRule.all
  end
 
  def show
    @alertRule = AlertRule.find(params[:id])
  end
 
  def new
    @alertRule = AlertRule.new
  end
 
  def edit
    @alertRule = AlertRule.find(params[:id])
  end
 
  def create
    @alertRule = AlertRule.new(alertRule_params)
 
    if @alertRule.save
      redirect_to alertRules_path
    else
      render 'new'
    end
  end
 
  def update
    @alertRule = AlertRule.find(params[:id])
 
    if @alertRule.update(alertRule_params)
      redirect_to alertRules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @alertRule = AlertRule.find(params[:id])
    @alertRule.destroy
    redirect_to alertRules_path
  end

 
  private
    def alertRule_params
      params.require(:alertRule).permit(:name, :expression, :Severity)
    end
end