class PaymentCardsController < ApplicationController
  def index
    @payment_cards = PaymentCard.all
  end

  def find
    @payment_card = PaymentCard.find(params[:id])
  end

  def new
    @payment_card = PaymentCard.new
  end

  def edit
    @payment_card = PaymentCard.find(params[:id])
  end

  def create
    @payment_card = PaymentCard.new(payment_card_params)

    if @payment_card.save
      redirect_to payment_cards_path
    else
      render "new"
    end
  end

  def update
    @payment_card = PaymentCard.find(params[:id])

    if @payment_card.update(payment_card_params)
      redirect_to payment_cards_path
    else
      render "edit"
    end
  end

  def destroy
    @payment_card = PaymentCard.find(params[:id])
    @payment_card.destroy
    redirect_to payment_cards_path
  end

  private

  def payment_card_params
    params.require(:payment_card).permit(
      :card_number,
      :embossed_name,
      :expiry_month,
      :expiry_year,
      :card_type,
      :card_status,
      :network
    )
  end
end
