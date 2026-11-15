class DataSourcesController < ApplicationController
  def index
    @data_sources = DataSource.all
  end
 
  def find
    @data_source = DataSource.find(params[:id])
  end
 
  def new
    @data_source = DataSource.new
  end
 
  def edit
    @data_source = DataSource.find(params[:id])
  end
 
  def create
    @data_source = DataSource.new(data_source_params)
 
    if @data_source.save
      redirect_to data_sources_path
    else
      render 'new'
    end
  end
 
  def update
    @data_source = DataSource.find(params[:id])
 
    if @data_source.update(data_source_params)
      redirect_to data_sources_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @data_source = DataSource.find(params[:id])
    @data_source.destroy
    redirect_to data_sources_path
  end

 
  private
    def data_source_params
      params.require(:data_source).permit(
        :name,
        :connection,
        :streaming,
        :source_type,
        :format
      )

  end
end