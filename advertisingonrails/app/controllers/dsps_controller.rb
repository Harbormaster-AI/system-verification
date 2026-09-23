
class DSPsController < ApplicationController
  def index
    @dSPs = DSP.all
  end
 
  def find
    @dSP = DSP.find(params[:id])
  end
 
  def new
    @dSP = DSP.new
  end
 
  def edit
    @dSP = DSP.find(params[:id])
  end
 
  def create
    @dSP = DSP.new(dSP_params)
 
    if @dSP.save
      redirect_to dSPs_path
    else
      render 'new'
    end
  end
 
  def update
    @dSP = DSP.find(params[:id])
 
    if @dSP.update(dSP_params)
      redirect_to dSPs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @dSP = DSP.find(params[:id])
    @dSP.destroy
    redirect_to dSPs_path
  end

 
  private
    def dSP_params
      params.require(:dSP).permit(:name, :website, :region)
    end
end