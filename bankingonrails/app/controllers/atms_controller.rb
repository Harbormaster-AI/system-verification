class ATMsController < ApplicationController
  def index
    @aTMs = ATM.all
  end
 
  def show
    @aTM = ATM.find(params[:id])
  end
 
  def new
    @aTM = ATM.new
  end
 
  def edit
    @aTM = ATM.find(params[:id])
  end
 
  def create
    @aTM = ATM.new(aTM_params)
 
    if @aTM.save
      redirect_to aTMs_path
    else
      render 'new'
    end
  end
 
  def update
    @aTM = ATM.find(params[:id])
 
    if @aTM.update(aTM_params)
      redirect_to aTMs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aTM = ATM.find(params[:id])
    @aTM.destroy
    redirect_to aTMs_path
  end

 
  private
    def aTM_params
      params.require(:aTM).permit(:terminalId, :location, :Status)
    end
end