
class ReportsController < ApplicationController
  def index
    @reports = Report.all
  end
 
  def find
    @report = Report.find(params[:id])
  end
 
  def new
    @report = Report.new
  end
 
  def edit
    @report = Report.find(params[:id])
  end
 
  def create
    @report = Report.new(report_params)
 
    if @report.save
      redirect_to reports_path
    else
      render 'new'
    end
  end
 
  def update
    @report = Report.find(params[:id])
 
    if @report.update(report_params)
      redirect_to reports_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @report = Report.find(params[:id])
    @report.destroy
    redirect_to reports_path
  end

 
  private
    def report_params
      params.require(:report).permit(:reportName, :generatedAt, :fileUrl, :ReportType)
    end
end