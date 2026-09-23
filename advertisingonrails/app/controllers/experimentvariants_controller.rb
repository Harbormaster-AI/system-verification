
class ExperimentVariantsController < ApplicationController
  def index
    @experimentVariants = ExperimentVariant.all
  end
 
  def find
    @experimentVariant = ExperimentVariant.find(params[:id])
  end
 
  def new
    @experimentVariant = ExperimentVariant.new
  end
 
  def edit
    @experimentVariant = ExperimentVariant.find(params[:id])
  end
 
  def create
    @experimentVariant = ExperimentVariant.new(experimentVariant_params)
 
    if @experimentVariant.save
      redirect_to experimentVariants_path
    else
      render 'new'
    end
  end
 
  def update
    @experimentVariant = ExperimentVariant.find(params[:id])
 
    if @experimentVariant.update(experimentVariant_params)
      redirect_to experimentVariants_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @experimentVariant = ExperimentVariant.find(params[:id])
    @experimentVariant.destroy
    redirect_to experimentVariants_path
  end

 
  private
    def experimentVariant_params
      params.require(:experimentVariant).permit(:name, :allocation)
    end
end