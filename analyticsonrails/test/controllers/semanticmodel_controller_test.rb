require "test_helper"

class SemanticModelControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @semantic_model = semantic_models(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create semantic_model" do
    assert_difference("SemanticModel.count") do
      post semantic_models_url, params: { semantic_model: {
        name:"test string for name", 
version:"test string for version", 
grain:"test string for grain"
 } }
    end

    assert_redirected_to semantic_models_url
  end

 
  
  test "should destroy semantic_model" do
    assert_difference("SemanticModel.count", -1) do
      delete semantic_model_url(@semantic_model)
    end

    assert_redirected_to semantic_models_url
  end
  
end


