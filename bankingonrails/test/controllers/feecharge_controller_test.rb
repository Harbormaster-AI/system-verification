require "test_helper"

class FeeChargeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @feeCharge = feeCharges(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create feeCharge" do
    assert_difference("FeeCharge.count") do
      post feeCharges_url, params: { feeCharge: { feeCode:"test string for feeCode", amount:"test value", appliedOn:1.week.ago, FeeType:FeeCharge.FeeTypes[0] } }
    end

    assert_redirected_to feeCharges_url
  end

 
  
  test "should destroy feeCharge" do
    assert_difference("FeeCharge.count", -1) do
      delete feeCharge_url(@feeCharge)
    end

    assert_redirected_to feeCharges_url
  end
  
end


