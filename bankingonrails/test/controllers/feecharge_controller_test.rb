require "test_helper"

class FeeChargeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @fee_charge = fee_charges(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create fee_charge" do
    assert_difference("FeeCharge.count") do
      post fee_charges_url, params: { fee_charge: {
                        FeeType:FeeCharge.FeeTypes[0]
 } }
    end

    assert_redirected_to fee_charges_url
  end

 
  
  test "should destroy fee_charge" do
    assert_difference("FeeCharge.count", -1) do
      delete fee_charge_url(@fee_charge)
    end

    assert_redirected_to fee_charges_url
  end
  
end


