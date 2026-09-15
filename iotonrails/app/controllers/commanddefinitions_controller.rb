
class CommandDefinitionsController < ApplicationController
  def index
    @commandDefinitions = CommandDefinition.all
  end
 
  def show
    @commandDefinition = CommandDefinition.find(params[:id])
  end
 
  def new
    @commandDefinition = CommandDefinition.new
  end
 
  def edit
    @commandDefinition = CommandDefinition.find(params[:id])
  end
 
  def create
    @commandDefinition = CommandDefinition.new(commandDefinition_params)
 
    if @commandDefinition.save
      redirect_to commandDefinitions_path
    else
      render 'new'
    end
  end
 
  def update
    @commandDefinition = CommandDefinition.find(params[:id])
 
    if @commandDefinition.update(commandDefinition_params)
      redirect_to commandDefinitions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @commandDefinition = CommandDefinition.find(params[:id])
    @commandDefinition.destroy
    redirect_to commandDefinitions_path
  end

 
  private
    def commandDefinition_params
      params.require(:commandDefinition).permit(:name, :requestSchemaUri, :responseSchemaUri, :timeoutSeconds)
    end
end