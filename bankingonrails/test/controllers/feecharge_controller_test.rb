require "test_helper"

class FeeChargeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_fee_charge = _fee_charges(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _fee_charge" do
    assert_difference("FeeCharge.count") do
      post _fee_charges_url, params: { _fee_charge: {
                        FeeType:FeeCharge.FeeTypes[0]
 } }
    end

    assert_redirected_to _fee_charges_url
  end

 
  
  test "should destroy _fee_charge" do
    assert_difference("FeeCharge.count", -1) do
      delete _fee_charge_url(@_fee_charge)
    end

    assert_redirected_to _fee_charges_url
  end
  
end


