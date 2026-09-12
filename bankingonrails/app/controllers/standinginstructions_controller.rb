class StandingInstructionsController < ApplicationController
  def index
    @standingInstructions = StandingInstruction.all
  end
 
  def show
    @standingInstruction = StandingInstruction.find(params[:id])
  end
 
  def new
    @standingInstruction = StandingInstruction.new
  end
 
  def edit
    @standingInstruction = StandingInstruction.find(params[:id])
  end
 
  def create
    @standingInstruction = StandingInstruction.new(standingInstruction_params)
 
    if @standingInstruction.save
      redirect_to standingInstructions_path
    else
      render 'new'
    end
  end
 
  def update
    @standingInstruction = StandingInstruction.find(params[:id])
 
    if @standingInstruction.update(standingInstruction_params)
      redirect_to standingInstructions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @standingInstruction = StandingInstruction.find(params[:id])
    @standingInstruction.destroy
    redirect_to standingInstructions_path
  end

 
  private
    def standingInstruction_params
      params.require(:standingInstruction).permit(:instructionId, :amount, :nextExecutionDate, :Frequency, :Status)
    end
end