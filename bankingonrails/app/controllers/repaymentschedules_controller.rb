class RepaymentSchedulesController < ApplicationController
  def index
    @_repayment_schedules = RepaymentSchedule.all
  end
 
  def find
    @_repayment_schedule = RepaymentSchedule.find(params[:id])
  end
 
  def new
    @_repayment_schedule = RepaymentSchedule.new
  end
 
  def edit
    @_repayment_schedule = RepaymentSchedule.find(params[:id])
  end
 
  def create
    @_repayment_schedule = RepaymentSchedule.new(_repayment_schedule_params)
 
    if @_repayment_schedule.save
      redirect_to _repayment_schedules_path
    else
      render 'new'
    end
  end
 
  def update
    @_repayment_schedule = RepaymentSchedule.find(params[:id])
 
    if @_repayment_schedule.update(_repayment_schedule_params)
      redirect_to _repayment_schedules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_repayment_schedule = RepaymentSchedule.find(params[:id])
    @_repayment_schedule.destroy
    redirect_to _repayment_schedules_path
  end

 
  private
    def _repayment_schedule_params
      params.require(:_repayment_schedule).permit(
        :installment_number,
        :due_date,
        :principal_due,
        :interest_due,
        :total_due,
      )

