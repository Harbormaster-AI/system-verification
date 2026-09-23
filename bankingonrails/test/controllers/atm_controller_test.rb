require "test_helper"

class ATMControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @a_t_m = a_t_ms(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create a_t_m" do
    assert_difference("ATM.count") do
      post a_t_ms_url, params: { a_t_m: {
                        Status:ATM.Statuss[0]
 } }
    end

    assert_redirected_to a_t_ms_url
  end

 
  
  test "should destroy a_t_m" do
    assert_difference("ATM.count", -1) do
      delete a_t_m_url(@a_t_m)
    end

    assert_redirected_to a_t_ms_url
  end
  
end


