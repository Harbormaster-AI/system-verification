require "test_helper"

class RateCardControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @rateCard = rateCards(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create rateCard" do
    assert_difference("RateCard.count") do
      post rateCards_url, params: { rateCard: { name:"test string for name", effectiveDate:1.week.ago, currency:"test string for currency" } }
    end

    assert_redirected_to rateCards_url
  end

 
  
  test "should destroy rateCard" do
    assert_difference("RateCard.count", -1) do
      delete rateCard_url(@rateCard)
    end

    assert_redirected_to rateCards_url
  end
  
end


