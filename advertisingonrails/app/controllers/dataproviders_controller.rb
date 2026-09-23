
class DataProvidersController < ApplicationController
  def index
    @dataProviders = DataProvider.all
  end
 
  def find
    @dataProvider = DataProvider.find(params[:id])
  end
 
  def new
    @dataProvider = DataProvider.new
  end
 
  def edit
    @dataProvider = DataProvider.find(params[:id])
  end
 
  def create
    @dataProvider = DataProvider.new(dataProvider_params)
 
    if @dataProvider.save
      redirect_to dataProviders_path
    else
      render 'new'
    end
  end
 
  def update
    @dataProvider = DataProvider.find(params[:id])
 
    if @dataProvider.update(dataProvider_params)
      redirect_to dataProviders_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dataProvider = DataProvider.find(params[:id])
    @dataProvider.destroy
    redirect_to dataProviders_path
  end

 
  private
    def dataProvider_params
      params.require(:dataProvider).permit(:name, :website, :ProviderType)
    end
end