class ATMsController < ApplicationController
  def index
    @a_t_ms = ATM.all
  end
 
  def find
    @a_t_m = ATM.find(params[:id])
  end
 
  def new
    @a_t_m = ATM.new
  end
 
  def edit
    @a_t_m = ATM.find(params[:id])
  end
 
  def create
    @a_t_m = ATM.new(a_t_m_params)
 
    if @a_t_m.save
      redirect_to a_t_ms_path
    else
      render 'new'
    end
  end
 
  def update
    @a_t_m = ATM.find(params[:id])
 
    if @a_t_m.update(a_t_m_params)
      redirect_to a_t_ms_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @a_t_m = ATM.find(params[:id])
    @a_t_m.destroy
    redirect_to a_t_ms_path
  end

 
  private
    def a_t_m_params
      params.require(:a_t_m).permit(
        :terminal_id,
        :location,
        :status
      )

  end
end