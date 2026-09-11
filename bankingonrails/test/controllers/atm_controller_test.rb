require "test_helper"

class ATMControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aTM = aTMs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aTM" do
    assert_difference("ATM.count") do
      post aTMs_url, params: { aTM: { terminalId:"test string for terminalId", location:"test value", Status:ATM.Statuss[0] } }
    end

    assert_redirected_to aTMs_url
  end

 
  
  test "should destroy aTM" do
    assert_difference("ATM.count", -1) do
      delete aTM_url(@aTM)
    end

    assert_redirected_to aTMs_url
  end
  
end


