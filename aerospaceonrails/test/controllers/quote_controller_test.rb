require "test_helper"

class QuoteControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @quote = quotes(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create quote" do
    assert_difference("Quote.count") do
      post quotes_url, params: { quote: {
        quote_number:"test string for quoteNumber", 
total_amount:"test value"
 } }
    end

    assert_redirected_to quotes_url
  end

 
  
  test "should destroy quote" do
    assert_difference("Quote.count", -1) do
      delete quote_url(@quote)
    end

    assert_redirected_to quotes_url
  end
  
end


