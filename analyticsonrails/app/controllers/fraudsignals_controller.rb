class FraudSignalsController < ApplicationController
  def index
    @fraud_signals = FraudSignal.all
  end
 
  def find
    @fraud_signal = FraudSignal.find(params[:id])
  end
 
  def new
    @fraud_signal = FraudSignal.new
  end
 
  def edit
    @fraud_signal = FraudSignal.find(params[:id])
  end
 
  def create
    @fraud_signal = FraudSignal.new(fraud_signal_params)
 
    if @fraud_signal.save
      redirect_to fraud_signals_path
    else
      render 'new'
    end
  end
 
  def update
    @fraud_signal = FraudSignal.find(params[:id])
 
    if @fraud_signal.update(fraud_signal_params)
      redirect_to fraud_signals_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @fraud_signal = FraudSignal.find(params[:id])
    @fraud_signal.destroy
    redirect_to fraud_signals_path
  end

 
  private
    def fraud_signal_params
      params.require(:fraud_signal).permit(
        :name,
        :rule_logic,
        :signal_type
      )

  end
end