
class CreativeFilesController < ApplicationController
  def index
    @creativeFiles = CreativeFile.all
  end
 
  def find
    @creativeFile = CreativeFile.find(params[:id])
  end
 
  def new
    @creativeFile = CreativeFile.new
  end
 
  def edit
    @creativeFile = CreativeFile.find(params[:id])
  end
 
  def create
    @creativeFile = CreativeFile.new(creativeFile_params)
 
    if @creativeFile.save
      redirect_to creativeFiles_path
    else
      render 'new'
    end
  end
 
  def update
    @creativeFile = CreativeFile.find(params[:id])
 
    if @creativeFile.update(creativeFile_params)
      redirect_to creativeFiles_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @creativeFile = CreativeFile.find(params[:id])
    @creativeFile.destroy
    redirect_to creativeFiles_path
  end

 
  private
    def creativeFile_params
      params.require(:creativeFile).permit(:uri, :fileSizeKB, :mimeType, :checksum)
    end
end