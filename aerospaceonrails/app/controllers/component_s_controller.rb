class Component_sController < ApplicationController
  def index
    @component_s = Component_.all
  end
 
  def find
    @component_ = Component_.find(params[:id])
  end
 
  def new
    @component_ = Component_.new
  end
 
  def edit
    @component_ = Component_.find(params[:id])
  end
 
  def create
    @component_ = Component_.new(component__params)
 
    if @component_.save
      redirect_to component_s_path
    else
      render 'new'
    end
  end
 
  def update
    @component_ = Component_.find(params[:id])
 
    if @component_.update(component__params)
      redirect_to component_s_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @component_ = Component_.find(params[:id])
    @component_.destroy
    redirect_to component_s_path
  end

 
  private
    def component__params
      params.require(:component_).permit(
        :part_number,
        :name,
        :component_category,
        :serialization_method
      )

  end
end