require "test_helper"

class PaymentMethodControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @paymentMethod = paymentMethods(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create paymentMethod" do
    assert_difference("PaymentMethod.count") do
      post paymentMethods_url, params: { paymentMethod: { last4:"test string for last4", cardholderName:"test string for cardholderName", billingAddress:"test value", MethodType:PaymentMethod.MethodTypes[0] } }
    end

    assert_redirected_to paymentMethods_url
  end

 
  
  test "should destroy paymentMethod" do
    assert_difference("PaymentMethod.count", -1) do
      delete paymentMethod_url(@paymentMethod)
    end

    assert_redirected_to paymentMethods_url
  end
  
end


