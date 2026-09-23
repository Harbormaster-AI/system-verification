require "test_helper"

class CollateralControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_collateral = _collaterals(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _collateral" do
    assert_difference("Collateral.count") do
      post _collaterals_url, params: { _collateral: {
                        CollateralType:Collateral.CollateralTypes[0]
 } }
    end

    assert_redirected_to _collaterals_url
  end

 
  
  test "should destroy _collateral" do
    assert_difference("Collateral.count", -1) do
      delete _collateral_url(@_collateral)
    end

    assert_redirected_to _collaterals_url
  end
  
end


