require "test_helper"

class DataProviderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dataProvider = dataProviders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dataProvider" do
    assert_difference("DataProvider.count") do
      post dataProviders_url, params: { dataProvider: { name:"test string for name", website:"test string for website", ProviderType:DataProvider.ProviderTypes[0] } }
    end

    assert_redirected_to dataProviders_url
  end

 
  
  test "should destroy dataProvider" do
    assert_difference("DataProvider.count", -1) do
      delete dataProvider_url(@dataProvider)
    end

    assert_redirected_to dataProviders_url
  end
  
end


