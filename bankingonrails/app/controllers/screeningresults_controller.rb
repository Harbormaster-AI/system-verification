class ScreeningResultsController < ApplicationController
  def index
    @screening_results = ScreeningResult.all
  end

  def find
    @screening_result = ScreeningResult.find(params[:id])
  end

  def new
    @screening_result = ScreeningResult.new
  end

  def edit
    @screening_result = ScreeningResult.find(params[:id])
  end

  def create
    @screening_result = ScreeningResult.new(screening_result_params)

    if @screening_result.save
      redirect_to screening_results_path
    else
      render "new"
    end
  end

  def update
    @screening_result = ScreeningResult.find(params[:id])

    if @screening_result.update(screening_result_params)
      redirect_to screening_results_path
    else
      render "edit"
    end
  end

  def destroy
    @screening_result = ScreeningResult.find(params[:id])
    @screening_result.destroy
    redirect_to screening_results_path
  end

  private

  def screening_result_params
    params.require(:screening_result).permit(
      :screening_date,
      :provider,
      :outcome
    )
  end
end
