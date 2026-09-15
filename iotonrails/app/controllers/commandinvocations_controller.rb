
class CommandInvocationsController < ApplicationController
  def index
    @commandInvocations = CommandInvocation.all
  end
 
  def show
    @commandInvocation = CommandInvocation.find(params[:id])
  end
 
  def new
    @commandInvocation = CommandInvocation.new
  end
 
  def edit
    @commandInvocation = CommandInvocation.find(params[:id])
  end
 
  def create
    @commandInvocation = CommandInvocation.new(commandInvocation_params)
 
    if @commandInvocation.save
      redirect_to commandInvocations_path
    else
      render 'new'
    end
  end
 
  def update
    @commandInvocation = CommandInvocation.find(params[:id])
 
    if @commandInvocation.update(commandInvocation_params)
      redirect_to commandInvocations_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @commandInvocation = CommandInvocation.find(params[:id])
    @commandInvocation.destroy
    redirect_to commandInvocations_path
  end

 
  private
    def commandInvocation_params
      params.require(:commandInvocation).permit(:invocationId, :requestedAt, :completedAt, :Status)
    end
end