require "test_helper"

class ATMControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_a_t_m = _a_t_ms(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _a_t_m" do
    assert_difference("ATM.count") do
      post _a_t_ms_url, params: { _a_t_m: {
                        Status:ATM.Statuss[0]
 } }
    end

    assert_redirected_to _a_t_ms_url
  end

 
  
  test "should destroy _a_t_m" do
    assert_difference("ATM.count", -1) do
      delete _a_t_m_url(@_a_t_m)
    end

    assert_redirected_to _a_t_ms_url
  end
  
end


