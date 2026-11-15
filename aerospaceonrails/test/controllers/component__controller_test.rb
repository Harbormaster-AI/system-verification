require "test_helper"

class Component_ControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @component_ = component_s(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create component_" do
    assert_difference("Component_.count") do
      post component_s_url, params: { component_: {
        part_number:"test string for partNumber", 
name:"test string for name", 
component_category:Component_.ComponentCategorys[0], 
serialization_method:Component_.SerializationMethods[0]
 } }
    end

    assert_redirected_to component_s_url
  end

 
  
  test "should destroy component_" do
    assert_difference("Component_.count", -1) do
      delete component__url(@component_)
    end

    assert_redirected_to component_s_url
  end
  
end


