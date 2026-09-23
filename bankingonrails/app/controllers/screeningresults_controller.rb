class ScreeningResultsController < ApplicationController
  def index
    @_screening_results = ScreeningResult.all
  end
 
  def find
    @_screening_result = ScreeningResult.find(params[:id])
  end
 
  def new
    @_screening_result = ScreeningResult.new
  end
 
  def edit
    @_screening_result = ScreeningResult.find(params[:id])
  end
 
  def create
    @_screening_result = ScreeningResult.new(_screening_result_params)
 
    if @_screening_result.save
      redirect_to _screening_results_path
    else
      render 'new'
    end
  end
 
  def update
    @_screening_result = ScreeningResult.find(params[:id])
 
    if @_screening_result.update(_screening_result_params)
      redirect_to _screening_results_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_screening_result = ScreeningResult.find(params[:id])
    @_screening_result.destroy
    redirect_to _screening_results_path
  end

 
  private
    def _screening_result_params
      params.require(:_screening_result).permit(:screeningDate, :provider, :Outcome)
    end
end

