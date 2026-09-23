require "test_helper"

class BrandSafetyPolicyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @brandSafetyPolicy = brandSafetyPolicys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create brandSafetyPolicy" do
    assert_difference("BrandSafetyPolicy.count") do
      post brandSafetyPolicys_url, params: { brandSafetyPolicy: { Level:BrandSafetyPolicy.Levels[0], ContentRatingThreshold:BrandSafetyPolicy.ContentRatingThresholds[0] } }
    end

    assert_redirected_to brandSafetyPolicys_url
  end

 
  
  test "should destroy brandSafetyPolicy" do
    assert_difference("BrandSafetyPolicy.count", -1) do
      delete brandSafetyPolicy_url(@brandSafetyPolicy)
    end

    assert_redirected_to brandSafetyPolicys_url
  end
  
end


