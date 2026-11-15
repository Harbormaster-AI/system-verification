class VisualizationsController < ApplicationController
  def index
    @visualizations = Visualization.all
  end
 
  def find
    @visualization = Visualization.find(params[:id])
  end
 
  def new
    @visualization = Visualization.new
  end
 
  def edit
    @visualization = Visualization.find(params[:id])
  end
 
  def create
    @visualization = Visualization.new(visualization_params)
 
    if @visualization.save
      redirect_to visualizations_path
    else
      render 'new'
    end
  end
 
  def update
    @visualization = Visualization.find(params[:id])
 
    if @visualization.update(visualization_params)
      redirect_to visualizations_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @visualization = Visualization.find(params[:id])
    @visualization.destroy
    redirect_to visualizations_path
  end

 
  private
    def visualization_params
      params.require(:visualization).permit(
        :title,
        :options,
        :chart_type
      )

  end
end