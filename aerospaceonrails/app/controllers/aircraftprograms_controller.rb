class AircraftProgramsController < ApplicationController
  def index
    @aircraft_programs = AircraftProgram.all
  end
 
  def find
    @aircraft_program = AircraftProgram.find(params[:id])
  end
 
  def new
    @aircraft_program = AircraftProgram.new
  end
 
  def edit
    @aircraft_program = AircraftProgram.find(params[:id])
  end
 
  def create
    @aircraft_program = AircraftProgram.new(aircraft_program_params)
 
    if @aircraft_program.save
      redirect_to aircraft_programs_path
    else
      render 'new'
    end
  end
 
  def update
    @aircraft_program = AircraftProgram.find(params[:id])
 
    if @aircraft_program.update(aircraft_program_params)
      redirect_to aircraft_programs_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @aircraft_program = AircraftProgram.find(params[:id])
    @aircraft_program.destroy
    redirect_to aircraft_programs_path
  end

 
  private
    def aircraft_program_params
      params.require(:aircraft_program).permit(
        :name,
        :program_code,
        :entry_into_service_year,
        :status
      )

  end
end