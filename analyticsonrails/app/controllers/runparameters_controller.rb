class RunParametersController < ApplicationController
  def index
    @run_parameters = RunParameter.all
  end
 
  def find
    @run_parameter = RunParameter.find(params[:id])
  end
 
  def new
    @run_parameter = RunParameter.new
  end
 
  def edit
    @run_parameter = RunParameter.find(params[:id])
  end
 
  def create
    @run_parameter = RunParameter.new(run_parameter_params)
 
    if @run_parameter.save
      redirect_to run_parameters_path
    else
      render 'new'
    end
  end
 
  def update
    @run_parameter = RunParameter.find(params[:id])
 
    if @run_parameter.update(run_parameter_params)
      redirect_to run_parameters_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @run_parameter = RunParameter.find(params[:id])
    @run_parameter.destroy
    redirect_to run_parameters_path
  end

 
  private
    def run_parameter_params
      params.require(:run_parameter).permit(
        :name,
        :value
      )

  end
end