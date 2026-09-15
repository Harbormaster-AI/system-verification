require "test_helper"

class SimCardControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @simCard = simCards(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create simCard" do
    assert_difference("SimCard.count") do
      post simCards_url, params: { simCard: { iccid:"test string for iccid", imsi:"test string for imsi", carrier:"test string for carrier", Status:SimCard.Statuss[0] } }
    end

    assert_redirected_to simCards_url
  end

 
  
  test "should destroy simCard" do
    assert_difference("SimCard.count", -1) do
      delete simCard_url(@simCard)
    end

    assert_redirected_to simCards_url
  end
  
end


