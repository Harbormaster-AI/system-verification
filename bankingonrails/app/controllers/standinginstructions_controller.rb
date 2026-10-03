class StandingInstructionsController < ApplicationController
  def index
    @standing_instructions = StandingInstruction.all
  end

  def find
    @standing_instruction = StandingInstruction.find(params[:id])
  end

  def new
    @standing_instruction = StandingInstruction.new
  end

  def edit
    @standing_instruction = StandingInstruction.find(params[:id])
  end

  def create
    @standing_instruction = StandingInstruction.new(standing_instruction_params)

    if @standing_instruction.save
      redirect_to standing_instructions_path
    else
      render "new"
    end
  end

  def update
    @standing_instruction = StandingInstruction.find(params[:id])

    if @standing_instruction.update(standing_instruction_params)
      redirect_to standing_instructions_path
    else
      render "edit"
    end
  end

  def destroy
    @standing_instruction = StandingInstruction.find(params[:id])
    @standing_instruction.destroy
    redirect_to standing_instructions_path
  end

  private

  def standing_instruction_params
    params.require(:standing_instruction).permit(
      :instruction_id,
      :amount,
      :next_execution_date,
      :frequency,
      :status
    )
  end
end
