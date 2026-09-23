require "test_helper"

class DSPControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dSP = dSPs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dSP" do
    assert_difference("DSP.count") do
      post dSPs_url, params: { dSP: { name:"test string for name", website:"test string for website", region:"test string for region" } }
    end

    assert_redirected_to dSPs_url
  end

 
  
  test "should destroy dSP" do
    assert_difference("DSP.count", -1) do
      delete dSP_url(@dSP)
    end

    assert_redirected_to dSPs_url
  end
  
end


