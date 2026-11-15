class ProductionLinesController < ApplicationController
  def index
    @production_lines = ProductionLine.all
  end
 
  def find
    @production_line = ProductionLine.find(params[:id])
  end
 
  def new
    @production_line = ProductionLine.new
  end
 
  def edit
    @production_line = ProductionLine.find(params[:id])
  end
 
  def create
    @production_line = ProductionLine.new(production_line_params)
 
    if @production_line.save
      redirect_to production_lines_path
    else
      render 'new'
    end
  end
 
  def update
    @production_line = ProductionLine.find(params[:id])
 
    if @production_line.update(production_line_params)
      redirect_to production_lines_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @production_line = ProductionLine.find(params[:id])
    @production_line.destroy
    redirect_to production_lines_path
  end

 
  private
    def production_line_params
      params.require(:production_line).permit(
        :name,
        :line_type
      )

  end
end