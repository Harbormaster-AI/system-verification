class DataSetsController < ApplicationController
  def index
    @data_sets = DataSet.all
  end
 
  def find
    @data_set = DataSet.find(params[:id])
  end
 
  def new
    @data_set = DataSet.new
  end
 
  def edit
    @data_set = DataSet.find(params[:id])
  end
 
  def create
    @data_set = DataSet.new(data_set_params)
 
    if @data_set.save
      redirect_to data_sets_path
    else
      render 'new'
    end
  end
 
  def update
    @data_set = DataSet.find(params[:id])
 
    if @data_set.update(data_set_params)
      redirect_to data_sets_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @data_set = DataSet.find(params[:id])
    @data_set.destroy
    redirect_to data_sets_path
  end

 
  private
    def data_set_params
      params.require(:data_set).permit(
        :name,
        :schema_version,
        :refresh_schedule,
        :sensitive,
        :data_format
      )

  end
end