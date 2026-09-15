require "test_helper"

class CommandDefinitionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @commandDefinition = commandDefinitions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create commandDefinition" do
    assert_difference("CommandDefinition.count") do
      post commandDefinitions_url, params: { commandDefinition: { name:"test string for name", requestSchemaUri:"test value", responseSchemaUri:"test value", timeoutSeconds:100 } }
    end

    assert_redirected_to commandDefinitions_url
  end

 
  
  test "should destroy commandDefinition" do
    assert_difference("CommandDefinition.count", -1) do
      delete commandDefinition_url(@commandDefinition)
    end

    assert_redirected_to commandDefinitions_url
  end
  
end


