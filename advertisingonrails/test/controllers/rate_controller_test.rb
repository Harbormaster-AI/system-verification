require "test_helper"

class RateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @rate = rates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create rate" do
    assert_difference("Rate.count") do
      post rates_url, params: { rate: { unitPrice:"test value", AdFormat:Rate.AdFormats[0], PricingModel:Rate.PricingModels[0] } }
    end

    assert_redirected_to rates_url
  end

 
  
  test "should destroy rate" do
    assert_difference("Rate.count", -1) do
      delete rate_url(@rate)
    end

    assert_redirected_to rates_url
  end
  
end


