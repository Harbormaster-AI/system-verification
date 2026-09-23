require "test_helper"

class ExperimentVariantControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @experimentVariant = experimentVariants(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create experimentVariant" do
    assert_difference("ExperimentVariant.count") do
      post experimentVariants_url, params: { experimentVariant: { name:"test string for name", allocation:"test value" } }
    end

    assert_redirected_to experimentVariants_url
  end

 
  
  test "should destroy experimentVariant" do
    assert_difference("ExperimentVariant.count", -1) do
      delete experimentVariant_url(@experimentVariant)
    end

    assert_redirected_to experimentVariants_url
  end
  
end


