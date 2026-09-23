class StandingInstructionsController < ApplicationController
  def index
    @_standing_instructions = StandingInstruction.all
  end
 
  def find
    @_standing_instruction = StandingInstruction.find(params[:id])
  end
 
  def new
    @_standing_instruction = StandingInstruction.new
  end
 
  def edit
    @_standing_instruction = StandingInstruction.find(params[:id])
  end
 
  def create
    @_standing_instruction = StandingInstruction.new(_standing_instruction_params)
 
    if @_standing_instruction.save
      redirect_to _standing_instructions_path
    else
      render 'new'
    end
  end
 
  def update
    @_standing_instruction = StandingInstruction.find(params[:id])
 
    if @_standing_instruction.update(_standing_instruction_params)
      redirect_to _standing_instructions_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_standing_instruction = StandingInstruction.find(params[:id])
    @_standing_instruction.destroy
    redirect_to _standing_instructions_path
  end

 
  private
    def _standing_instruction_params
      params.require(:_standing_instruction).permit(:instructionId, :amount, :nextExecutionDate, :Frequency, :Status)
    end
end

