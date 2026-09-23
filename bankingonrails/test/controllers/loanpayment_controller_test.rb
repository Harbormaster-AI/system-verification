require "test_helper"

class LoanPaymentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @loan_payment = loan_payments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create loan_payment" do
    assert_difference("LoanPayment.count") do
      post loan_payments_url, params: { loan_payment: {
        payment_reference: "test string for paymentReference",
        amount: "test value",
        payment_date: 1.week.ago,
        method: LoanPayment.Methods[0],
        status: LoanPayment.Statuss[0]
      } }
    end

    assert_redirected_to loan_payments_url
  end

  test "should destroy loan_payment" do
    assert_difference("LoanPayment.count", -1) do
      delete loan_payment_url(@loan_payment)
    end

    assert_redirected_to loan_payments_url
  end
end
