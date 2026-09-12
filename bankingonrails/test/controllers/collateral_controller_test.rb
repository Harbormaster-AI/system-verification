require "test_helper"

class CollateralControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @collateral = collaterals(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create collateral" do
    assert_difference("Collateral.count") do
      post collaterals_url, params: { collateral: { appraisedValue:"test value", description:"test string for description", location:"test value", CollateralType:Collateral.CollateralTypes[0] } }
    end

    assert_redirected_to collaterals_url
  end

 
  
  test "should destroy collateral" do
    assert_difference("Collateral.count", -1) do
      delete collateral_url(@collateral)
    end

    assert_redirected_to collaterals_url
  end
  
end


