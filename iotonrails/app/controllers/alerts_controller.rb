
class AlertsController < ApplicationController
  def index
    @alerts = Alert.all
  end
 
  def show
    @alert = Alert.find(params[:id])
  end
 
  def new
    @alert = Alert.new
  end
 
  def edit
    @alert = Alert.find(params[:id])
  end
 
  def create
    @alert = Alert.new(alert_params)
 
    if @alert.save
      redirect_to alerts_path
    else
      render 'new'
    end
  end
 
  def update
    @alert = Alert.find(params[:id])
 
    if @alert.update(alert_params)
      redirect_to alerts_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @alert = Alert.find(params[:id])
    @alert.destroy
    redirect_to alerts_path
  end

 
  private
    def alert_params
      params.require(:alert).permit(:raisedAt, :clearedAt, :message, :Status)
    end
end