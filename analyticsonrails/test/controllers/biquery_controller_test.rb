require "test_helper"

class BIQueryControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @b_i_query = b_i_querys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create b_i_query" do
    assert_difference("BIQuery.count") do
      post b_i_querys_url, params: { b_i_query: {
        name:"test string for name", 
text:"test string for text", 
dialect:BIQuery.Dialects[0]
 } }
    end

    assert_redirected_to b_i_querys_url
  end

 
  
  test "should destroy b_i_query" do
    assert_difference("BIQuery.count", -1) do
      delete b_i_query_url(@b_i_query)
    end

    assert_redirected_to b_i_querys_url
  end
  
end


