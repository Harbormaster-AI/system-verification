class Operator_sController < ApplicationController
  def index
    @operator_s = Operator_.all
  end
 
  def find
    @operator_ = Operator_.find(params[:id])
  end
 
  def new
    @operator_ = Operator_.new
  end
 
  def edit
    @operator_ = Operator_.find(params[:id])
  end
 
  def create
    @operator_ = Operator_.new(operator__params)
 
    if @operator_.save
      redirect_to operator_s_path
    else
      render 'new'
    end
  end
 
  def update
    @operator_ = Operator_.find(params[:id])
 
    if @operator_.update(operator__params)
      redirect_to operator_s_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @operator_ = Operator_.find(params[:id])
    @operator_.destroy
    redirect_to operator_s_path
  end

 
  private
    def operator__params
      params.require(:operator_).permit(
        :name,
        :icao_designator,
        :operator_type
      )

  end
end