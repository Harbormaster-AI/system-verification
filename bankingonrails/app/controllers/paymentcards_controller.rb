class PaymentCardsController < ApplicationController
  def index
    @_payment_cards = PaymentCard.all
  end
 
  def find
    @_payment_card = PaymentCard.find(params[:id])
  end
 
  def new
    @_payment_card = PaymentCard.new
  end
 
  def edit
    @_payment_card = PaymentCard.find(params[:id])
  end
 
  def create
    @_payment_card = PaymentCard.new(_payment_card_params)
 
    if @_payment_card.save
      redirect_to _payment_cards_path
    else
      render 'new'
    end
  end
 
  def update
    @_payment_card = PaymentCard.find(params[:id])
 
    if @_payment_card.update(_payment_card_params)
      redirect_to _payment_cards_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @_payment_card = PaymentCard.find(params[:id])
    @_payment_card.destroy
    redirect_to _payment_cards_path
  end

 
  private
    def _payment_card_params
      params.require(:_payment_card).permit(:cardNumber, :embossedName, :expiryMonth, :expiryYear, :CardType, :CardStatus, :Network)
    end
end

