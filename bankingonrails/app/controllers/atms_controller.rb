
class ATMsController < ApplicationController
  def index
    @_a_t_ms = ATM.all
  end
 
  def find
    @_a_t_m = ATM.find(params[:id])
  end
 
  def new
    @_a_t_m = ATM.new
  end
 
  def edit
    @_a_t_m = ATM.find(params[:id])
  end
 
  def create
    @_a_t_m = ATM.new(_a_t_m_params)
 
    if @_a_t_m.save
      redirect_to _a_t_ms_path
    else
      render 'new'
    end
  end
 
  def update
    @_a_t_m = ATM.find(params[:id])
 
    if @_a_t_m.update(_a_t_m_params)
      redirect_to _a_t_ms_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_a_t_m = ATM.find(params[:id])
    @_a_t_m.destroy
    redirect_to _a_t_ms_path
  end

 
  private
    def _a_t_m_params
      params.require(:_a_t_m).permit(:terminalId, :location, :Status)
    end
end