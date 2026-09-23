require "test_helper"

class PaymentCardControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @payment_card = payment_cards(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create payment_card" do
    assert_difference("PaymentCard.count") do
      post payment_cards_url, params: { payment_card: {
        card_number:"test value", 
embossed_name:"test string for embossedName", 
expiry_month:100, 
expiry_year:100, 
card_type:PaymentCard.CardTypes[0], 
card_status:PaymentCard.CardStatuss[0], 
network:PaymentCard.Networks[0]
 } }
    end

    assert_redirected_to payment_cards_url
  end

 
  
  test "should destroy payment_card" do
    assert_difference("PaymentCard.count", -1) do
      delete payment_card_url(@payment_card)
    end

    assert_redirected_to payment_cards_url
  end
  
end


