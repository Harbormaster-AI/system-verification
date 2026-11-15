class MeasuresController < ApplicationController
  def index
    @measures = Measure.all
  end
 
  def find
    @measure = Measure.find(params[:id])
  end
 
  def new
    @measure = Measure.new
  end
 
  def edit
    @measure = Measure.find(params[:id])
  end
 
  def create
    @measure = Measure.new(measure_params)
 
    if @measure.save
      redirect_to measures_path
    else
      render 'new'
    end
  end
 
  def update
    @measure = Measure.find(params[:id])
 
    if @measure.update(measure_params)
      redirect_to measures_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @measure = Measure.find(params[:id])
    @measure.destroy
    redirect_to measures_path
  end

 
  private
    def measure_params
      params.require(:measure).permit(
        :name,
        :format,
        :aggregation
      )

  end
end