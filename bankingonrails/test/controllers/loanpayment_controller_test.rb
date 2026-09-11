require "test_helper"

class LoanPaymentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @loanPayment = loanPayments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create loanPayment" do
    assert_difference("LoanPayment.count") do
      post loanPayments_url, params: { loanPayment: { paymentReference:"test string for paymentReference", amount:"test value", paymentDate:1.week.ago, Method:LoanPayment.Methods[0], Status:LoanPayment.Statuss[0] } }
    end

    assert_redirected_to loanPayments_url
  end

 
  
  test "should destroy loanPayment" do
    assert_difference("LoanPayment.count", -1) do
      delete loanPayment_url(@loanPayment)
    end

    assert_redirected_to loanPayments_url
  end
  
end


