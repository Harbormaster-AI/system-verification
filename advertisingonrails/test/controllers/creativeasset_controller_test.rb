require "test_helper"

class CreativeAssetControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @creativeAsset = creativeAssets(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create creativeAsset" do
    assert_difference("CreativeAsset.count") do
      post creativeAssets_url, params: { creativeAsset: { name:"test string for name", clickUrl:"test value", landingPage:"test value", width:100, height:100, durationSeconds:100, CreativeType:CreativeAsset.CreativeTypes[0], AdFormat:CreativeAsset.AdFormats[0] } }
    end

    assert_redirected_to creativeAssets_url
  end

 
  
  test "should destroy creativeAsset" do
    assert_difference("CreativeAsset.count", -1) do
      delete creativeAsset_url(@creativeAsset)
    end

    assert_redirected_to creativeAssets_url
  end
  
end


