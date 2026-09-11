class RepaymentSchedulesController < ApplicationController
  def index
    @repaymentSchedules = RepaymentSchedule.all
  end
 
  def show
    @repaymentSchedule = RepaymentSchedule.find(params[:id])
  end
 
  def new
    @repaymentSchedule = RepaymentSchedule.new
  end
 
  def edit
    @repaymentSchedule = RepaymentSchedule.find(params[:id])
  end
 
  def create
    @repaymentSchedule = RepaymentSchedule.new(repaymentSchedule_params)
 
    if @repaymentSchedule.save
      redirect_to repaymentSchedules_path
    else
      render 'new'
    end
  end
 
  def update
    @repaymentSchedule = RepaymentSchedule.find(params[:id])
 
    if @repaymentSchedule.update(repaymentSchedule_params)
      redirect_to repaymentSchedules_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @repaymentSchedule = RepaymentSchedule.find(params[:id])
    @repaymentSchedule.destroy
    redirect_to repaymentSchedules_path
  end

 
  private
    def repaymentSchedule_params
      params.require(:repaymentSchedule).permit(:installmentNumber, :dueDate, :principalDue, :interestDue, :totalDue, :Status)
    end
end