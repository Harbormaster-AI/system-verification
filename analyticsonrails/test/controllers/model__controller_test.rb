require "test_helper"

class Model_ControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @model_ = model_s(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create model_" do
    assert_difference("Model_.count") do
      post model_s_url, params: { model_: {
        name:"test string for name", 
task_description:"test string for taskDescription", 
model_type:Model_.ModelTypes[0]
 } }
    end

    assert_redirected_to model_s_url
  end

 
  
  test "should destroy model_" do
    assert_difference("Model_.count", -1) do
      delete model__url(@model_)
    end

    assert_redirected_to model_s_url
  end
  
end


