class RepaymentSchedulesController < ApplicationController
  def index
    @repayment_schedules = RepaymentSchedule.all
  end
 
  def find
    @repayment_schedule = RepaymentSchedule.find(params[:id])
  end
 
  def new
    @repayment_schedule = RepaymentSchedule.new
  end
 
  def edit
    @repayment_schedule = RepaymentSchedule.find(params[:id])
  end
 
  def create
    @repayment_schedule = RepaymentSchedule.new(repayment_schedule_params)
 
    if @repayment_schedule.save
      redirect_to repayment_schedules_path
    else
      render 'new'
    end
  end
 
  def update
    @repayment_schedule = RepaymentSchedule.find(params[:id])
 
    if @repayment_schedule.update(repayment_schedule_params)
      redirect_to repayment_schedules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @repayment_schedule = RepaymentSchedule.find(params[:id])
    @repayment_schedule.destroy
    redirect_to repayment_schedules_path
  end

 
  private
    def repayment_schedule_params
      params.require(:repayment_schedule).permit(
        :installment_number,
        :due_date,
        :principal_due,
        :interest_due,
        :total_due,
        :status
      )

