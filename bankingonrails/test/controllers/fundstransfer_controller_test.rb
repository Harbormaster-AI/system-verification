require "test_helper"

class FundsTransferControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @funds_transfer = funds_transfers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create funds_transfer" do
    assert_difference("FundsTransfer.count") do
      post funds_transfers_url, params: { funds_transfer: {
        transfer_reference: "test string for transferReference",
        amount: "test value",
        requested_date: 1.week.ago,
        execution_date: 1.week.ago,
        purpose: "test string for purpose",
        fee_amount: "test value",
        method: FundsTransfer.Methods[0],
        status: FundsTransfer.Statuss[0]
      } }
    end

    assert_redirected_to funds_transfers_url
  end

  test "should destroy funds_transfer" do
    assert_difference("FundsTransfer.count", -1) do
      delete funds_transfer_url(@funds_transfer)
    end

    assert_redirected_to funds_transfers_url
  end
end
