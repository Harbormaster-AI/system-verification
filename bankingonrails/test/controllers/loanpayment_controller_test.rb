require "test_helper"

class LoanPaymentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_loan_payment = _loan_payments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _loan_payment" do
    assert_difference("LoanPayment.count") do
      post _loan_payments_url, params: { _loan_payment: {
                        Status:LoanPayment.Statuss[0]
 } }
    end

    assert_redirected_to _loan_payments_url
  end

 
  
  test "should destroy _loan_payment" do
    assert_difference("LoanPayment.count", -1) do
      delete _loan_payment_url(@_loan_payment)
    end

    assert_redirected_to _loan_payments_url
  end
  
end


