require "test_helper"

class CreativeVariationControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @creativeVariation = creativeVariations(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create creativeVariation" do
    assert_difference("CreativeVariation.count") do
      post creativeVariations_url, params: { creativeVariation: { name:"test string for name", language:"test string for language", headline:"test string for headline", bodyText:"test string for bodyText", callToAction:"test string for callToAction" } }
    end

    assert_redirected_to creativeVariations_url
  end

 
  
  test "should destroy creativeVariation" do
    assert_difference("CreativeVariation.count", -1) do
      delete creativeVariation_url(@creativeVariation)
    end

    assert_redirected_to creativeVariations_url
  end
  
end


