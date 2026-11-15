require "test_helper"

class FeatureSetControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @feature_set = feature_sets(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create feature_set" do
    assert_difference("FeatureSet.count") do
      post feature_sets_url, params: { feature_set: {
        name:"test string for name", 
refresh_schedule:"test value", 
store_type:FeatureSet.StoreTypes[0]
 } }
    end

    assert_redirected_to feature_sets_url
  end

 
  
  test "should destroy feature_set" do
    assert_difference("FeatureSet.count", -1) do
      delete feature_set_url(@feature_set)
    end

    assert_redirected_to feature_sets_url
  end
  
end


