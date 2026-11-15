class APUsController < ApplicationController
  def index
    @a_p_us = APU.all
  end
 
  def find
    @a_p_u = APU.find(params[:id])
  end
 
  def new
    @a_p_u = APU.new
  end
 
  def edit
    @a_p_u = APU.find(params[:id])
  end
 
  def create
    @a_p_u = APU.new(a_p_u_params)
 
    if @a_p_u.save
      redirect_to a_p_us_path
    else
      render 'new'
    end
  end
 
  def update
    @a_p_u = APU.find(params[:id])
 
    if @a_p_u.update(a_p_u_params)
      redirect_to a_p_us_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @a_p_u = APU.find(params[:id])
    @a_p_u.destroy
    redirect_to a_p_us_path
  end

 
  private
    def a_p_u_params
      params.require(:a_p_u).permit(
        :model_
      )

  end
end