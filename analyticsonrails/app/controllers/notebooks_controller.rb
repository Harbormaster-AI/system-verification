class NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.all
  end
 
  def find
    @notebook = Notebook.find(params[:id])
  end
 
  def new
    @notebook = Notebook.new
  end
 
  def edit
    @notebook = Notebook.find(params[:id])
  end
 
  def create
    @notebook = Notebook.new(notebook_params)
 
    if @notebook.save
      redirect_to notebooks_path
    else
      render 'new'
    end
  end
 
  def update
    @notebook = Notebook.find(params[:id])
 
    if @notebook.update(notebook_params)
      redirect_to notebooks_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    redirect_to notebooks_path
  end

 
  private
    def notebook_params
      params.require(:notebook).permit(
        :title,
        :repository,
        :language
      )

  end
end