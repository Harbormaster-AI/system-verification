require "test_helper"

class ModelVersionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @model_version = model_versions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create model_version" do
    assert_difference("ModelVersion.count") do
      post model_versions_url, params: { model_version: {
        version:"test string for version", 
lifecycle:ModelVersion.Lifecycles[0], 
training_status:ModelVersion.TrainingStatuss[0]
 } }
    end

    assert_redirected_to model_versions_url
  end

 
  
  test "should destroy model_version" do
    assert_difference("ModelVersion.count", -1) do
      delete model_version_url(@model_version)
    end

    assert_redirected_to model_versions_url
  end
  
end


