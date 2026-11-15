require "test_helper"

class FeatureControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @feature = features(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create feature" do
    assert_difference("Feature.count") do
      post features_url, params: { feature: {
        name:"test string for name", 
description:"test string for description", 
data_type:Feature.DataTypes[0]
 } }
    end

    assert_redirected_to features_url
  end

 
  
  test "should destroy feature" do
    assert_difference("Feature.count", -1) do
      delete feature_url(@feature)
    end

    assert_redirected_to features_url
  end
  
end


