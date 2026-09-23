require "test_helper"

class PaymentCardControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_payment_card = _payment_cards(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _payment_card" do
    assert_difference("PaymentCard.count") do
      post _payment_cards_url, params: { _payment_card: {
                        Network:PaymentCard.Networks[0]
 } }
    end

    assert_redirected_to _payment_cards_url
  end

 
  
  test "should destroy _payment_card" do
    assert_difference("PaymentCard.count", -1) do
      delete _payment_card_url(@_payment_card)
    end

    assert_redirected_to _payment_cards_url
  end
  
end


