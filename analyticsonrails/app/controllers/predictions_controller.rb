class PredictionsController < ApplicationController
  def index
    @predictions = Prediction.all
  end
 
  def find
    @prediction = Prediction.find(params[:id])
  end
 
  def new
    @prediction = Prediction.new
  end
 
  def edit
    @prediction = Prediction.find(params[:id])
  end
 
  def create
    @prediction = Prediction.new(prediction_params)
 
    if @prediction.save
      redirect_to predictions_path
    else
      render 'new'
    end
  end
 
  def update
    @prediction = Prediction.find(params[:id])
 
    if @prediction.update(prediction_params)
      redirect_to predictions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @prediction = Prediction.find(params[:id])
    @prediction.destroy
    redirect_to predictions_path
  end

 
  private
    def prediction_params
      params.require(:prediction).permit(
        :reference_key,
        :predicted_at,
        :score
      )

  end
end