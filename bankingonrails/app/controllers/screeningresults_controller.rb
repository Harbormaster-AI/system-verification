class ScreeningResultsController < ApplicationController
  def index
    @screeningResults = ScreeningResult.all
  end
 
  def show
    @screeningResult = ScreeningResult.find(params[:id])
  end
 
  def new
    @screeningResult = ScreeningResult.new
  end
 
  def edit
    @screeningResult = ScreeningResult.find(params[:id])
  end
 
  def create
    @screeningResult = ScreeningResult.new(screeningResult_params)
 
    if @screeningResult.save
      redirect_to screeningResults_path
    else
      render 'new'
    end
  end
 
  def update
    @screeningResult = ScreeningResult.find(params[:id])
 
    if @screeningResult.update(screeningResult_params)
      redirect_to screeningResults_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @screeningResult = ScreeningResult.find(params[:id])
    @screeningResult.destroy
    redirect_to screeningResults_path
  end

 
  private
    def screeningResult_params
      params.require(:screeningResult).permit(:screeningDate, :provider, :Outcome)
    end
end