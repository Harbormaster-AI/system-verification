class AnomalysController < ApplicationController
  def index
    @anomalys = Anomaly.all
  end
 
  def find
    @anomaly = Anomaly.find(params[:id])
  end
 
  def new
    @anomaly = Anomaly.new
  end
 
  def edit
    @anomaly = Anomaly.find(params[:id])
  end
 
  def create
    @anomaly = Anomaly.new(anomaly_params)
 
    if @anomaly.save
      redirect_to anomalys_path
    else
      render 'new'
    end
  end
 
  def update
    @anomaly = Anomaly.find(params[:id])
 
    if @anomaly.update(anomaly_params)
      redirect_to anomalys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @anomaly = Anomaly.find(params[:id])
    @anomaly.destroy
    redirect_to anomalys_path
  end

 
  private
    def anomaly_params
      params.require(:anomaly).permit(
        :occurred_at,
        :details,
        :anomaly_type,
        :severity
      )

  end
end