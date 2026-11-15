class AvionicsSuitesController < ApplicationController
  def index
    @avionics_suites = AvionicsSuite.all
  end
 
  def find
    @avionics_suite = AvionicsSuite.find(params[:id])
  end
 
  def new
    @avionics_suite = AvionicsSuite.new
  end
 
  def edit
    @avionics_suite = AvionicsSuite.find(params[:id])
  end
 
  def create
    @avionics_suite = AvionicsSuite.new(avionics_suite_params)
 
    if @avionics_suite.save
      redirect_to avionics_suites_path
    else
      render 'new'
    end
  end
 
  def update
    @avionics_suite = AvionicsSuite.find(params[:id])
 
    if @avionics_suite.update(avionics_suite_params)
      redirect_to avionics_suites_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @avionics_suite = AvionicsSuite.find(params[:id])
    @avionics_suite.destroy
    redirect_to avionics_suites_path
  end

 
  private
    def avionics_suite_params
      params.require(:avionics_suite).permit(
        :suite_name,
        :software_baseline
      )

  end
end