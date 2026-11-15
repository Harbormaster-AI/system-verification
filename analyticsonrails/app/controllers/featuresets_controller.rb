class FeatureSetsController < ApplicationController
  def index
    @feature_sets = FeatureSet.all
  end
 
  def find
    @feature_set = FeatureSet.find(params[:id])
  end
 
  def new
    @feature_set = FeatureSet.new
  end
 
  def edit
    @feature_set = FeatureSet.find(params[:id])
  end
 
  def create
    @feature_set = FeatureSet.new(feature_set_params)
 
    if @feature_set.save
      redirect_to feature_sets_path
    else
      render 'new'
    end
  end
 
  def update
    @feature_set = FeatureSet.find(params[:id])
 
    if @feature_set.update(feature_set_params)
      redirect_to feature_sets_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @feature_set = FeatureSet.find(params[:id])
    @feature_set.destroy
    redirect_to feature_sets_path
  end

 
  private
    def feature_set_params
      params.require(:feature_set).permit(
        :name,
        :refresh_schedule,
        :store_type
      )

  end
end