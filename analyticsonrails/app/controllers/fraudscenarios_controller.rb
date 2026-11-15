class FraudScenariosController < ApplicationController
  def index
    @fraud_scenarios = FraudScenario.all
  end
 
  def find
    @fraud_scenario = FraudScenario.find(params[:id])
  end
 
  def new
    @fraud_scenario = FraudScenario.new
  end
 
  def edit
    @fraud_scenario = FraudScenario.find(params[:id])
  end
 
  def create
    @fraud_scenario = FraudScenario.new(fraud_scenario_params)
 
    if @fraud_scenario.save
      redirect_to fraud_scenarios_path
    else
      render 'new'
    end
  end
 
  def update
    @fraud_scenario = FraudScenario.find(params[:id])
 
    if @fraud_scenario.update(fraud_scenario_params)
      redirect_to fraud_scenarios_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @fraud_scenario = FraudScenario.find(params[:id])
    @fraud_scenario.destroy
    redirect_to fraud_scenarios_path
  end

 
  private
    def fraud_scenario_params
      params.require(:fraud_scenario).permit(
        :name,
        :risk_appetite,
        :detection_type
      )

  end
end