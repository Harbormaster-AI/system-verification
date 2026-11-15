class RecommendationScenariosController < ApplicationController
  def index
    @recommendation_scenarios = RecommendationScenario.all
  end
 
  def find
    @recommendation_scenario = RecommendationScenario.find(params[:id])
  end
 
  def new
    @recommendation_scenario = RecommendationScenario.new
  end
 
  def edit
    @recommendation_scenario = RecommendationScenario.find(params[:id])
  end
 
  def create
    @recommendation_scenario = RecommendationScenario.new(recommendation_scenario_params)
 
    if @recommendation_scenario.save
      redirect_to recommendation_scenarios_path
    else
      render 'new'
    end
  end
 
  def update
    @recommendation_scenario = RecommendationScenario.find(params[:id])
 
    if @recommendation_scenario.update(recommendation_scenario_params)
      redirect_to recommendation_scenarios_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @recommendation_scenario = RecommendationScenario.find(params[:id])
    @recommendation_scenario.destroy
    redirect_to recommendation_scenarios_path
  end

 
  private
    def recommendation_scenario_params
      params.require(:recommendation_scenario).permit(
        :name,
        :objective,
        :recommendation_type
      )

  end
end