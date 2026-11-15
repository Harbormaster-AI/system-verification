class DataTasksController < ApplicationController
  def index
    @data_tasks = DataTask.all
  end
 
  def find
    @data_task = DataTask.find(params[:id])
  end
 
  def new
    @data_task = DataTask.new
  end
 
  def edit
    @data_task = DataTask.find(params[:id])
  end
 
  def create
    @data_task = DataTask.new(data_task_params)
 
    if @data_task.save
      redirect_to data_tasks_path
    else
      render 'new'
    end
  end
 
  def update
    @data_task = DataTask.find(params[:id])
 
    if @data_task.update(data_task_params)
      redirect_to data_tasks_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @data_task = DataTask.find(params[:id])
    @data_task.destroy
    redirect_to data_tasks_path
  end

 
  private
    def data_task_params
      params.require(:data_task).permit(
        :name,
        :command,
        :retries,
        :task_type
      )

  end
end