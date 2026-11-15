class BuildSchedulesController < ApplicationController
  def index
    @build_schedules = BuildSchedule.all
  end
 
  def find
    @build_schedule = BuildSchedule.find(params[:id])
  end
 
  def new
    @build_schedule = BuildSchedule.new
  end
 
  def edit
    @build_schedule = BuildSchedule.find(params[:id])
  end
 
  def create
    @build_schedule = BuildSchedule.new(build_schedule_params)
 
    if @build_schedule.save
      redirect_to build_schedules_path
    else
      render 'new'
    end
  end
 
  def update
    @build_schedule = BuildSchedule.find(params[:id])
 
    if @build_schedule.update(build_schedule_params)
      redirect_to build_schedules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @build_schedule = BuildSchedule.find(params[:id])
    @build_schedule.destroy
    redirect_to build_schedules_path
  end

 
  private
    def build_schedule_params
      params.require(:build_schedule).permit(
        :schedule_number,
        :status
      )

  end
end