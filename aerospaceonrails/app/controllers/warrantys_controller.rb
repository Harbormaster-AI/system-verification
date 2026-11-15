class WarrantysController < ApplicationController
  def index
    @warrantys = Warranty.all
  end
 
  def find
    @warranty = Warranty.find(params[:id])
  end
 
  def new
    @warranty = Warranty.new
  end
 
  def edit
    @warranty = Warranty.find(params[:id])
  end
 
  def create
    @warranty = Warranty.new(warranty_params)
 
    if @warranty.save
      redirect_to warrantys_path
    else
      render 'new'
    end
  end
 
  def update
    @warranty = Warranty.find(params[:id])
 
    if @warranty.update(warranty_params)
      redirect_to warrantys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @warranty = Warranty.find(params[:id])
    @warranty.destroy
    redirect_to warrantys_path
  end

 
  private
    def warranty_params
      params.require(:warranty).permit(
        :coverage_months,
        :warranty_type
      )

  end
end