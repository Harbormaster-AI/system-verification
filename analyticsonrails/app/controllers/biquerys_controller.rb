class BIQuerysController < ApplicationController
  def index
    @b_i_querys = BIQuery.all
  end
 
  def find
    @b_i_query = BIQuery.find(params[:id])
  end
 
  def new
    @b_i_query = BIQuery.new
  end
 
  def edit
    @b_i_query = BIQuery.find(params[:id])
  end
 
  def create
    @b_i_query = BIQuery.new(b_i_query_params)
 
    if @b_i_query.save
      redirect_to b_i_querys_path
    else
      render 'new'
    end
  end
 
  def update
    @b_i_query = BIQuery.find(params[:id])
 
    if @b_i_query.update(b_i_query_params)
      redirect_to b_i_querys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @b_i_query = BIQuery.find(params[:id])
    @b_i_query.destroy
    redirect_to b_i_querys_path
  end

 
  private
    def b_i_query_params
      params.require(:b_i_query).permit(
        :name,
        :text,
        :dialect
      )

  end
end