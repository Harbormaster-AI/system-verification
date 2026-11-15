require "test_helper"

class EngineTypeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @engine_type = engine_types(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create engine_type" do
    assert_difference("EngineType.count") do
      post engine_types_url, params: { engine_type: {
        engine_model_code:"test string for engineModelCode", 
max_thrust_kn:"test value", 
category:EngineType.Categorys[0]
 } }
    end

    assert_redirected_to engine_types_url
  end

 
  
  test "should destroy engine_type" do
    assert_difference("EngineType.count", -1) do
      delete engine_type_url(@engine_type)
    end

    assert_redirected_to engine_types_url
  end
  
end


