class TrainingRunsController < ApplicationController
  def index
    @training_runs = TrainingRun.all
  end
 
  def find
    @training_run = TrainingRun.find(params[:id])
  end
 
  def new
    @training_run = TrainingRun.new
  end
 
  def edit
    @training_run = TrainingRun.find(params[:id])
  end
 
  def create
    @training_run = TrainingRun.new(training_run_params)
 
    if @training_run.save
      redirect_to training_runs_path
    else
      render 'new'
    end
  end
 
  def update
    @training_run = TrainingRun.find(params[:id])
 
    if @training_run.update(training_run_params)
      redirect_to training_runs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @training_run = TrainingRun.find(params[:id])
    @training_run.destroy
    redirect_to training_runs_path
  end

 
  private
    def training_run_params
      params.require(:training_run).permit(
        :run_label,
        :started_at,
        :completed_at,
        :status
      )

  end
end