class Model_sController < ApplicationController
  def index
    @model_s = Model_.all
  end
 
  def find
    @model_ = Model_.find(params[:id])
  end
 
  def new
    @model_ = Model_.new
  end
 
  def edit
    @model_ = Model_.find(params[:id])
  end
 
  def create
    @model_ = Model_.new(model__params)
 
    if @model_.save
      redirect_to model_s_path
    else
      render 'new'
    end
  end
 
  def update
    @model_ = Model_.find(params[:id])
 
    if @model_.update(model__params)
      redirect_to model_s_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @model_ = Model_.find(params[:id])
    @model_.destroy
    redirect_to model_s_path
  end

 
  private
    def model__params
      params.require(:model_).permit(
        :name,
        :task_description,
        :model_type
      )

  end
end