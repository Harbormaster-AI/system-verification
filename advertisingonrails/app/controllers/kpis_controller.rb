
class KPIsController < ApplicationController
  def index
    @kPIs = KPI.all
  end
 
  def find
    @kPI = KPI.find(params[:id])
  end
 
  def new
    @kPI = KPI.new
  end
 
  def edit
    @kPI = KPI.find(params[:id])
  end
 
  def create
    @kPI = KPI.new(kPI_params)
 
    if @kPI.save
      redirect_to kPIs_path
    else
      render 'new'
    end
  end
 
  def update
    @kPI = KPI.find(params[:id])
 
    if @kPI.update(kPI_params)
      redirect_to kPIs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @kPI = KPI.find(params[:id])
    @kPI.destroy
    redirect_to kPIs_path
  end

 
  private
    def kPI_params
      params.require(:kPI).permit(:targetValue, :MetricType)
    end
end