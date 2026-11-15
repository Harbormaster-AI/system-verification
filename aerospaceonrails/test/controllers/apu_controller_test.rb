require "test_helper"

class APUControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @a_p_u = a_p_us(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create a_p_u" do
    assert_difference("APU.count") do
      post a_p_us_url, params: { a_p_u: {
        model_:"test string for model_"
 } }
    end

    assert_redirected_to a_p_us_url
  end

 
  
  test "should destroy a_p_u" do
    assert_difference("APU.count", -1) do
      delete a_p_u_url(@a_p_u)
    end

    assert_redirected_to a_p_us_url
  end
  
end


