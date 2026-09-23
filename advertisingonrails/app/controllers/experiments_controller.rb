
class ExperimentsController < ApplicationController
  def index
    @experiments = Experiment.all
  end
 
  def find
    @experiment = Experiment.find(params[:id])
  end
 
  def new
    @experiment = Experiment.new
  end
 
  def edit
    @experiment = Experiment.find(params[:id])
  end
 
  def create
    @experiment = Experiment.new(experiment_params)
 
    if @experiment.save
      redirect_to experiments_path
    else
      render 'new'
    end
  end
 
  def update
    @experiment = Experiment.find(params[:id])
 
    if @experiment.update(experiment_params)
      redirect_to experiments_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @experiment = Experiment.find(params[:id])
    @experiment.destroy
    redirect_to experiments_path
  end

 
  private
    def experiment_params
      params.require(:experiment).permit(:name, :hypothesis, :startDate, :endDate, :Status)
    end
end